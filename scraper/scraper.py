import re
import os
import json
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# * last scraped on December 27, 2020

load_dotenv()

page_num = 1
movie_ids = []
movie_data = []

api_key = os.getenv('OMDB_API_KEY')

response = requests.get(
        f"https://www.imdb.com/india/top-rated-indian-movies/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=461131e5-5af0-4e50-bee2-223fad1e00ca&pf_rd_r=06N438KJ8C6K9M14VSN3&pf_rd_s=center-1&pf_rd_t=60601&pf_rd_i=india.toprated&ref_=fea_india_ss_toprated_india_tr_india250_sm").text

soup = BeautifulSoup(response, 'html.parser')
titles = soup.select('#main > div > span > div > div > div.lister > table > tbody > tr> td.titleColumn > a')

for title in titles:
    # extracts IMDb ID
    regex = re.search("tt\S{7}", str(title))
    movie_ids.append(regex.group(0))

# scrapes for json movie data
for movie_id in movie_ids:
    url = f"http://www.omdbapi.com/?i={movie_id}&apikey={api_key}"
    movie_json = requests.get(url).json()

    movie_json['imdbID'] = movie_id
    movie_data.append(movie_json)
    movie_data = list(filter(lambda movie_json: "Hindi" in movie_json["Language"], movie_data))


# converts to JSON and writes to file
with open('movie_data.json', 'w') as f:
    json.dump(movie_data, f)
