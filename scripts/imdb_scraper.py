import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
import logging
import json
import os
from urllib.parse import urljoin
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_session_with_retries(retries=3, backoff_factor=0.3):
    """Create a requests session with retry functionality"""
    session = requests.Session()
    retry = Retry(
        total=retries,
        read=retries,
        connect=retries,
        backoff_factor=backoff_factor,
        status_forcelist=[500, 502, 503, 504]
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session

def get_user_agent():
    """Return a random user agent string"""
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    ]
    return random.choice(user_agents)

def get_imdb_page(url):
    """Fetch the IMDb page with proper headers"""
    session = create_session_with_retries()
    headers = {
        'User-Agent': get_user_agent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0',
    }
    
    try:
        response = session.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        logger.error(f"Error fetching IMDb page: {e}")
        return None

def extract_movie_data(soup, with_id=True):
    """Extract movie data from the page soup"""
    movies = []
    movie_cards = soup.find_all('div', class_='ipc-poster-card')
    
    if not movie_cards:
        logger.warning("No movie cards found on the page")
        return movies
    
    logger.info(f"Found {len(movie_cards)} movie cards")
    
    for card in movie_cards:
        try:
            # Extract movie title
            title_element = card.select_one('span[data-testid="title"]')
            title = title_element.text.strip() if title_element else "Unknown Title"
            
            # Extract rating
            rating_element = card.select_one('span.ipc-rating-star--rating')
            rating = rating_element.text.strip() if rating_element else None
            
            # Extract poster URL
            img_element = card.select_one('img.ipc-image')
            poster_url = img_element.get('src') if img_element else None
            
            # Extract movie URL
            link_element = title_element.find_parent('a') if title_element else None
            movie_url = urljoin('https://www.imdb.com', link_element.get('href')) if link_element and link_element.get('href') else None
            
            # Extract movie ID from URL if requested
            movie_id = None
            if with_id and movie_url:
                import re
                id_match = re.search(r'/title/(tt\d+)/', movie_url)
                if id_match:
                    movie_id = id_match.group(1)
            
            movies.append({
                'title': title,
                'rating': rating,
                'poster_url': poster_url,
                'movie_url': movie_url,
                'id': movie_id
            })
            
        except Exception as e:
            logger.error(f"Error extracting data from a movie card: {e}")
    
    return movies

def scrape_imdb_interest_page(url='https://www.imdb.com/interest/in0000041/?ref_=ints_pi_in_i_4'):
    """Main function to scrape the IMDb interest page"""
    # Raunchy Comedy interest by default
    
    logger.info(f"Scraping IMDb interest page: {url}")
    html_content = get_imdb_page(url)
    
    if not html_content:
        logger.error("Failed to retrieve page content")
        return None
    
    soup = BeautifulSoup(html_content, 'html.parser')
    movies = extract_movie_data(soup)
    
    if not movies:
        logger.warning("No movie data could be extracted")
        return None
    
    # Create DataFrame
    df = pd.DataFrame(movies)
    return df

def save_to_json(movies, output_file="imdb_movies.json"):
    """Save scraped movies to a JSON file"""
    try:
        # Ensure directory exists
        output_dir = os.path.dirname(output_file)
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir)
            logger.info(f"Created directory: {output_dir}")

        # Convert DataFrame to list of dictionaries if it's a DataFrame
        if isinstance(movies, pd.DataFrame):
            movies_list = movies.to_dict(orient='records')
        else:
            movies_list = movies
            
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump({
                'movies': movies_list,
                'count': len(movies_list),
                'scraped_at': time.strftime('%Y-%m-%d %H:%M:%S')
            }, f, indent=2, ensure_ascii=False)
            
        logger.info(f"Successfully saved JSON data to {output_file}")
        print(f"\nData saved to {output_file}")
        return True
    except Exception as e:
        logger.error(f"Error saving to JSON: {e}")
        print(f"\nFailed to save JSON data: {e}")
        return False

def display_dataframe(df):
    """Display dataframe with clean formatting"""
    if df is None or df.empty:
        logger.warning("No data to display")
        print("No movies to display")
        return
        
    # Set pandas display options
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', 1000)
    pd.set_option('display.colheader_justify', 'center')
    pd.set_option('display.max_colwidth', 50)
    
    print(df)

def ensure_directory_exists(directory):
    """Create directory if it doesn't exist"""
    if not os.path.exists(directory):
        try:
            os.makedirs(directory)
            logger.info(f"Created directory: {directory}")
            print(f"Created directory: {directory}")
            return True
        except Exception as e:
            logger.error(f"Failed to create directory {directory}: {e}")
            print(f"Failed to create directory {directory}: {e}")
            return False
    return True

def save_dataframe_to_csv(df, csv_path):
    """Save DataFrame to CSV with error handling"""
    try:
        df.to_csv(csv_path, index=False)
        logger.info(f"Successfully saved CSV data to {csv_path}")
        print(f"\nData saved to {csv_path}")
        return True
    except Exception as e:
        logger.error(f"Error saving to CSV: {e}")
        print(f"\nFailed to save CSV data: {e}")
        return False

def main():
    """Execute the scraper and display results"""
    try:
        # Default URL is Raunchy Comedy interest page
        url = 'https://www.imdb.com/interest/in0000041/?ref_=ints_pi_in_i_4'
        
        # Scrape the IMDb page
        df = scrape_imdb_interest_page(url)
        
        if df is not None and not df.empty:
            # Display movie count and data
            print(f"\nSuccessfully scraped {len(df)} movies from IMDb's Raunchy Comedy interest page\n")
            display_dataframe(df)
            
            # Create data directory
            data_dir = os.path.join(os.getcwd(), 'data')
            if not ensure_directory_exists(data_dir):
                print("Cannot save files due to directory creation failure")
                return 1
                
            # Save to CSV
            csv_filename = os.path.join(data_dir, 'imdb_raunchy_comedy_movies.csv')
            save_dataframe_to_csv(df, csv_filename)
            
            # Save to JSON
            json_filename = os.path.join(data_dir, 'imdb_raunchy_comedy_movies.json')
            save_to_json(df, json_filename)
            
        else:
            logger.error("Failed to retrieve movie data")
            print("Failed to retrieve movie data. Please check the logs for details.")
            return 1
            
    except Exception as e:
        logger.error(f"An error occurred in the main function: {e}")
        print(f"An error occurred: {e}")
        return 1
        
    return 0

if __name__ == "__main__":
    main()
