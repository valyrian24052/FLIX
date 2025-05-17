import requests
import os
import urllib3
from dotenv import load_dotenv
from requests.packages.urllib3.exceptions import InsecureRequestWarning

urllib3.disable_warnings(InsecureRequestWarning)
load_dotenv()

def fetch_movies_page(page=1):
    tmdb_token = os.getenv('TMDB_API_TOKEN')

    base_url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "include_adult": "true",
        "include_video": "false",
        "language": "en-US",
        "page": str(page),
        "sort_by": "popularity.desc"
    }
    

    url = base_url + "?" + "&".join([f"{k}={v}" for k, v in params.items()])
    
    headers = {
        'Authorization': f'Bearer {tmdb_token}',
        'accept': 'application/json'
    }
    
    for attempt in range(3):
        try:
            session = requests.Session()
            
            adapter = requests.adapters.HTTPAdapter(max_retries=3)
            session.mount('https://', adapter)
            
            if attempt == 0:
                response = session.get(url, headers=headers, timeout=30)
            elif attempt == 1:
                response = session.get(url, headers=headers, verify=False, timeout=30)
            else:
                headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                response = session.get(url, headers=headers, verify=False, timeout=30)
                
            return response.json()
            
        except requests.exceptions.SSLError as e:
            print(f"SSL Error on attempt {attempt+1}: {str(e)}")
        except requests.exceptions.ConnectionError as e:
            print(f"Connection Error on attempt {attempt+1}: {str(e)}")
        except Exception as e:
            print(f"Unexpected error on attempt {attempt+1}: {str(e)}")
    
    return None