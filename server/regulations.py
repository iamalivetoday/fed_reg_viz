import httpx
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import asyncio
from dotenv import load_dotenv

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import shutil

from google.cloud import language_v2
from google.api_core.exceptions import GoogleAPICallError, RetryError

import os

load_dotenv()  # this loads .env variables into os.environ

apikey = os.getenv("API_KEY")

# API Key and Base URL setup
API_BASE_URL = "https://api.regulations.gov/v4/"

app = Flask(__name__)
CORS(app, supports_credentials=True, logging=True)

@app.route('/api/title/<docket_id>', methods=['GET'])
async def get_header(docket_id):
    headers = {"X-Api-Key": apikey}

    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_BASE_URL}dockets/{docket_id}", headers=headers)
        if response.status_code == 200:
          docket_data = response.json()
          dk_agency = docket_data.get("data", {}).get("attributes", {}).get("agencyId", "title not found.")
          dk_title = docket_data.get("data", {}).get("attributes", {}).get("title", "title not found.")
          return jsonify({"title": dk_title, "agency": dk_agency})
    return jsonify({"sorry!"})
    
@app.route('/api/comments_with_sentiment/<docket_id>', methods=['GET'])
async def comments_with_sentiment(docket_id):
    """
    Fetch comments for the given docket_id from regulations.gov,
    then run each comment's text through Google NLP for sentiment.
    Return an array of comments with sentiment fields.
    """
    headers = {"X-Api-Key": apikey}
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 20, type=int)

    documents_url = f"{API_BASE_URL}documents?filter[docketId]={docket_id}&page[size]={limit}&page[number]={page}&api_key={apikey}"

    async with httpx.AsyncClient() as client:
        # 1) Fetch documents
        documents_response = await client.get(documents_url, headers=headers)
        if documents_response.status_code != 200:
            return jsonify({
                "error": f"Failed to retrieve documents. Status: {documents_response.status_code}"
            }), documents_response.status_code

        documents_data = documents_response.json()
        object_ids = [
            doc['attributes']['objectId']
            for doc in documents_data['data']
            if 'attributes' in doc and 'objectId' in doc['attributes']
        ]

        # 2) For each document, fetch top-level comments
        async def fetch_comments(object_id):
            comments_url = f"{API_BASE_URL}comments?filter[commentOnId]={object_id}&page[size]={limit}&page[number]={page}&api_key={apikey}"
            resp = await client.get(comments_url, headers=headers)
            if resp.status_code == 200:
                return resp.json().get('data', [])
            return []

        comments_responses = await asyncio.gather(*[fetch_comments(obj_id) for obj_id in object_ids])
        all_comments = [comment for c_list in comments_responses for comment in c_list]

        # 3) For each comment, fetch the *detailed* text
        async def fetch_comment_details(comment):
            comment_id = comment['id']
            comment_url = f"{API_BASE_URL}comments/{comment_id}?api_key={apikey}"

            async with httpx.AsyncClient() as client2:
                detail_resp = await client2.get(comment_url, headers=headers)
                if detail_resp.status_code == 200:
                    detail_data = detail_resp.json()
                    comment_text = detail_data.get("data", {}).get("attributes", {}).get("comment", "")
                    name = comment.get("attributes", {}).get("title", "Anonymous")
                    
                    # Once we have the comment_text, analyze sentiment
                    return analyze_comment_sentiment(
                        comment_id, name, comment_text
                    )
                return None

        # gather full comment details (with sentiment) asynchronously
        comment_details = await asyncio.gather(
            *[fetch_comment_details(c) for c in all_comments]
        )
        comments_list = [c for c in comment_details if c is not None]

    return jsonify(comments_list)


def analyze_comment_sentiment(comment_id, name, text):
    """
    Calls Google NLP on a single comment's text.
    Returns a dict with id, name, text, and sentiment fields.
    """
    client = language_v2.LanguageServiceClient()
    encoding_type = language_v2.EncodingType.UTF8

    document = {
        "content": text,
        "type_": language_v2.Document.Type.PLAIN_TEXT,
        "language_code": "en"
    }
    label, color, score = "neutral", "#FFFF00", 0.0
    try:
        response = client.analyze_sentiment(
            request={"document": document, "encoding_type": encoding_type}
        )
        score = response.document_sentiment.score
        label, color = sentiment_label_and_color(score)
    except (GoogleAPICallError, RetryError) as e:
        print(f"Google NLP error: {e}")
        label, color, score = "error", "#808080", 0

    return {
        "id": comment_id,
        "name": name,
        "text": text,
        "sentiment": label,
        "score": score,
        "color": color
    }


def sentiment_label_and_color(score: float):
    """
    Convert a sentiment score (-1 to 1) into a label and a gradient color.
    """
    # Determine label
    if score < -0.2:
        label = "negative"
    elif score > 0.2:
        label = "positive"
    else:
        label = "neutral"
    
    # Map score to a gradient color
    red = int((1 - score) * 255) if score <= 0 else int((1 - abs(score)) * 255)
    green = int((1 + score) * 255) if score >= 0 else int((1 - abs(score)) * 255)
    blue = 0  # Optional: keep blue constant to stick with red-green gradient
    
    color = f"#{red:02X}{green:02X}{blue:02X}"
    
    return label, color


@app.route('/api/comments/<docket_id>', methods=['GET'])
async def comments(docket_id):
    headers = {"X-Api-Key": apikey}
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 20, type=int)
    documents_url = f"{API_BASE_URL}documents?filter[docketId]={docket_id}&page[size]={limit}&page[number]={page}&api_key={apikey}"

    async with httpx.AsyncClient() as client:
        documents_response = await client.get(documents_url, headers=headers)
        if documents_response.status_code != 200:
            return jsonify({"error": f"Failed to retrieve documents. Status: {documents_response.status_code}"}), documents_response.status_code

        documents_data = documents_response.json()
        object_ids = [
            doc['attributes']['objectId']
            for doc in documents_data['data']
            if 'attributes' in doc and 'objectId' in doc['attributes']
        ]

        async def fetch_comments(object_id):
            comments_url = f"{API_BASE_URL}comments?filter[commentOnId]={object_id}&page[size]={limit}&page[number]={page}&api_key={apikey}"
            response = await client.get(comments_url, headers=headers)
            if response.status_code == 200:
                return response.json().get('data', [])
            return []

        comments_responses = await asyncio.gather(*[fetch_comments(obj_id) for obj_id in object_ids])
        all_comments = [comment for c_list in comments_responses for comment in c_list]

        async def fetch_comment_details(comment):
            comment_id = comment['id']
            comment_url = f"{API_BASE_URL}comments/{comment_id}?api_key={apikey}"

            async with httpx.AsyncClient() as client2:
                resp = await client2.get(comment_url, headers=headers)
                if resp.status_code == 200:
                    comment_data = resp.json()
                    comment_text = comment_data.get("data", {}).get("attributes", {}).get("comment", "")
                    name = comment.get("attributes", {}).get("title", "Anonymous")
                    score = 0
                    label = "neutral"
                    color = "#FFFFFF"
                    return {
                        "id": comment_id,
                        "name": name,
                        "text": comment_text,
                        "sentiment": label,
                        "score": score,
                        "color": color
                    }
                return None

        comment_details = await asyncio.gather(*[fetch_comment_details(c) for c in all_comments])
        comments_list = [c for c in comment_details if c is not None]

    return jsonify(comments_list)

async def get_dockets_by_agency(agency):
    headers = {"X-Api-Key": apikey}
    async with httpx.AsyncClient() as client:
        dockets_response = await client.get(f"{API_BASE_URL}dockets?sort=-lastModifiedDate&filter[docketType]=Rulemaking&filter[agencyId]={agency}&api_key={apikey}", headers=headers)
    if dockets_response.status_code == 200:
        return dockets_response.json()
    else:
        print("Failed to retrieve dockets")
        return None

@app.route('/api/dockets/agency/<agency_acronym>', methods=['GET'])
async def dockets_by_agency_route(agency_acronym):
    try:
        agency_dockets = await get_dockets_by_agency(agency_acronym)
        if agency_dockets:
            return jsonify(agency_dockets)
        else:
            return jsonify({"error": "Failed to fetch dockets for the specified agency"}), 500
    except Exception as e:
        print(f"Error fetching dockets for agency {agency_acronym}: {e}")
        return jsonify({"error": "Failed to fetch dockets for the specified agency"}), 500

@app.route('/api/search/<term>', methods=['GET'])
def search_term(term):
    if not term:
        return jsonify({"error": "Search term is required"}), 400

    headers = {"X-Api-Key": apikey}
    search_url = f"{API_BASE_URL}documents?filter[searchTerm]={term}&api_key={apikey}"

    try:
        response = requests.get(search_url, headers=headers, timeout=10)  # Set a timeout to avoid hanging
        if response.status_code == 200:
            search_results = response.json()
            return jsonify(search_results)
        else:
            return jsonify({"error": f"Failed to search for term '{term}'. Status code: {response.status_code}"}), response.status_code
    except requests.exceptions.Timeout:
        return jsonify({"error": "Request timed out"}), 504
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route('/api/docket_abstract/<docket_id>', methods=['GET'])
async def docket_abstract(docket_id):
    headers = {"X-Api-Key": apikey}
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_BASE_URL}dockets/{docket_id}", headers=headers)
    if response.status_code == 200:
        docket_data = response.json()
        dk_abstract = docket_data.get("data", {}).get("attributes", {}).get("dkAbstract", "Abstract not found.")
        return jsonify({"abstract": dk_abstract})
    else:
        return jsonify({"error": "Failed to retrieve docket"}), response.status_code

@app.route('/')
async def home():
    return 'Welcome Madeleine'

def scrape_documents():
    CHROMEDRIVER_PATH = shutil.which("chromedriver")
    if not CHROMEDRIVER_PATH:
        return {"error": "Chromedriver not found!"}

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    service = Service(CHROMEDRIVER_PATH)
    driver = webdriver.Chrome(service=service, options=options)

    documents = []
    try:
        driver.get("https://www.regulations.gov")

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "ul.card-secondary-group li"))
        )

        soup = BeautifulSoup(driver.page_source, "html.parser")

        for li in soup.select("ul.card-secondary-group li"):
            title = li.select_one("h3.h4").get_text(strip=True) if li.select_one("h3.h4") else "No Title"
            link = li.select_one("a")["href"] if li.select_one("a") else "#"
            documents.append({"title": title, "link": f"https://www.regulations.gov{link}"})

    except Exception as e:
        return {"error": str(e)}
    finally:
        driver.quit()

    return documents

@app.route("/api/trending-docs", methods=["GET"])
def get_trending_documents():
    return jsonify(scrape_documents())

if __name__ == '__main__':
    import asyncio
    asyncio.run(app.run(debug=True, host='0.0.0.0'))

