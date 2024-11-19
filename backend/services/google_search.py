import os
import requests
from dotenv import load_dotenv
from .proposal_model import Proposal, KeyTopics, Reports

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
SEARCH_ENGINE_ID = os.getenv("SEARCH_ENGINE_ID")

trusted_sources = ["https://www.wikipedia.com",
                   "https://www.google.com",
                   "https://www.bbc.com",
                   "https://www.nytimes.com",
                   "https://www.wsj.com",
                   "https://www.bloomberg.com",
                   "https://www.statista.com",
                   "https://www.forbes.com",
                   "https://www.cnbc.com",
                   "https://www.businessinsider.com",
                   "https://www.marketwatch.com"]

def search_google(key_word: str, number_of_results: int):
    if number_of_results <= 0:
        return []
    search_words = []
    for i in trusted_sources:
        search_words.append(f"{key_word} site:{i}")
    search_results = []
    for q in search_words:
        try:
            query_url = f"https://www.googleapis.com/customsearch/v1?key={GOOGLE_API_KEY}&cx={SEARCH_ENGINE_ID}&q={q}&num={number_of_results}"
            response = requests.get(query_url)
            data = response.json()
            if "item" in data:
                for item in data["item"]:
                    if item["link"] in trusted_sources:
                        search_results.append({
                            "title": item.get("title", ""),
                            "description": item.get("snippet", ""),
                            "url": item.get("link", ""),
                            "status": "external",  # Add status field
                            "department": "External Source",  # Add department field
                            "submissionDate": "",  # Add empty submission date
                            "priority": "low"  # Add default priority
                        })
                        if len(search_results) >= number_of_results:
                            return search_results
        except Exception as e:
            print(f"Error in Google search: {e}")
            continue
    return search_results
