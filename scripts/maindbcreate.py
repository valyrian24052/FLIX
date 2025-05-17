import time
import db_connect
import tmdb_scraper
import datetime


TOTAL_PAGES = 1000
START_PAGE = 501
MAX_FAILURES = 5
SLEEP_TIME = 1
FAILED_PAGES_LOG = "failed_pages.log"

def log_failed_page(page, error):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(FAILED_PAGES_LOG, "a") as log_file:
        log_file.write(f"{timestamp} | Page {page} | Error: {error}\n")
    print(f"Logged failed page {page} to {FAILED_PAGES_LOG}")

def main():
    try:
        conn = db_connect.get_connection()
        db_connect.create_movies_table(conn)
        
        consecutive_failures = 0
        movies_added = 0
        
        for page in range(START_PAGE, TOTAL_PAGES + 1):
            try:
                print(f"\nProcessing page {page} of {TOTAL_PAGES}...")
                movie_data = tmdb_scraper.fetch_movies_page(page)
                
                if not movie_data or 'results' not in movie_data:
                    error_msg = "No results found in response"
                    print(f"No results found for page {page}")
                    log_failed_page(page, error_msg)
                    consecutive_failures += 1
                    if consecutive_failures >= MAX_FAILURES:
                        print(f"Too many consecutive failures ({MAX_FAILURES}). Stopping.")
                        break
                    continue
                
                consecutive_failures = 0
                
                for movie in movie_data['results']:
                    db_connect.insert_movie(conn, movie)
                    movies_added += 1
                
                print(f"Page {page} processed. Total movies added so far: {movies_added}")
                time.sleep(SLEEP_TIME)
                
            except Exception as e:
                print(f"Error processing page {page}: {e}")
                log_failed_page(page, str(e))
                consecutive_failures += 1
                if consecutive_failures >= MAX_FAILURES:
                    print(f"Too many consecutive failures ({MAX_FAILURES}). Stopping.")
                    break
        
        print(f"\nProcess completed. Total movies added: {movies_added}")
        conn.close()
        
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()