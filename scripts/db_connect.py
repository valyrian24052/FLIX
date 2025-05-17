import os
import psycopg2
from psycopg2.extras import execute_values
from dotenv import load_dotenv
import uuid
from datetime import datetime

load_dotenv()

db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")

conn_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}?sslmode=require"
IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

def get_connection():
    return psycopg2.connect(conn_string)

def create_movies_table(conn):
    with conn.cursor() as cur:
        cur.execute("""
        CREATE TABLE IF NOT EXISTS movies (
            flixx_id UUID PRIMARY KEY,
            tmdb_id INTEGER UNIQUE,
            title VARCHAR(255) NOT NULL,
            original_title VARCHAR(255),
            overview TEXT,
            popularity FLOAT,
            vote_average FLOAT,
            vote_count INTEGER,
            release_date DATE,
            poster_path VARCHAR(255),
            backdrop_path VARCHAR(255),
            original_language VARCHAR(10),
            adult BOOLEAN,
            video BOOLEAN,
            genre_ids INTEGER[],
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)
        conn.commit()
        print("Movies table schema created")

def insert_movie(conn, movie):
    try:
        flixx_id = str(uuid.uuid4())
        
        # Skip if movie has no title or ID
        if not movie.get('title') or not movie.get('id'):
            print(f"Skipping movie - missing required fields: {movie}")
            return None
            
        genre_ids_array = "{" + ",".join(map(str, movie.get('genre_ids', []))) + "}"
        
        poster_path = movie.get('poster_path')
        if poster_path:
            poster_path = IMAGE_BASE_URL + poster_path
            
        backdrop_path = movie.get('backdrop_path')
        if backdrop_path:
            backdrop_path = IMAGE_BASE_URL + backdrop_path
        
        with conn.cursor() as cur:
            cur.execute("""
            INSERT INTO movies (
                flixx_id, tmdb_id, title, original_title, overview, popularity, 
                vote_average, vote_count, release_date, poster_path, 
                backdrop_path, original_language, adult, video, genre_ids,
                updated_at
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (tmdb_id) DO UPDATE SET
                title = EXCLUDED.title,
                original_title = EXCLUDED.original_title,
                overview = EXCLUDED.overview,
                popularity = EXCLUDED.popularity,
                vote_average = EXCLUDED.vote_average,
                vote_count = EXCLUDED.vote_count,
                release_date = EXCLUDED.release_date,
                poster_path = EXCLUDED.poster_path,
                backdrop_path = EXCLUDED.backdrop_path,
                original_language = EXCLUDED.original_language,
                adult = EXCLUDED.adult,
                video = EXCLUDED.video,
                genre_ids = EXCLUDED.genre_ids,
                updated_at = CURRENT_TIMESTAMP
            RETURNING flixx_id
            """, (
                flixx_id,
                movie.get('id'),
                movie.get('title'),
                movie.get('original_title'),
                movie.get('overview'),
                movie.get('popularity'),
                movie.get('vote_average'),
                movie.get('vote_count'),
                movie.get('release_date'),
                poster_path,
                backdrop_path,
                movie.get('original_language'),
                movie.get('adult'),
                movie.get('video'),
                genre_ids_array,
                datetime.now()
            ))
            
            result = cur.fetchone()
            conn.commit()
            
            print(f"Added movie: '{movie.get('title')}' with ID: {result[0]}")
            return result[0]
            
    except psycopg2.Error as e:
        print(f"Database error when adding movie '{movie.get('title')}': {e}")
        if conn:
            conn.rollback()  
        return None
    except Exception as e:
        print(f"Unexpected error when adding movie '{movie.get('title')}': {e}")
        if conn:
            conn.rollback() 
        return None