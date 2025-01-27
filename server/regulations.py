import httpx
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import asyncio

from google.cloud import language_v2
from google.api_core.exceptions import GoogleAPICallError, RetryError

# API Key and Base URL setup
API_BASE_URL = "https://api.regulations.gov/v4/"
API_KEY = "YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4"

app = Flask(__name__)
CORS(app, supports_credentials=True, logging=True)

@app.route('/api/comments_no_sentiment/<docket_id>', methods=['GET'])
async def comments_no_sentiment(docket_id):
    """
    1) Fetch the comments from regulations.gov
    2) Return them *without* sentiment analysis
    """

    headers = {"X-Api-Key": API_KEY}
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 20, type=int)
    documents_url = f"{API_BASE_URL}documents?filter[docketId]={docket_id}&page[size]={limit}&page[number]={page}&api_key={API_KEY}"

    async with httpx.AsyncClient() as client:
        # 1) Get the documents
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

        # 2) For each document, fetch the top-level 'comments' references
        async def fetch_comments(object_id):
            comments_url = f"{API_BASE_URL}comments?filter[commentOnId]={object_id}&page[size]={limit}&page[number]={page}&api_key={API_KEY}"
            resp = await client.get(comments_url, headers=headers)
            if resp.status_code == 200:
                return resp.json().get('data', [])
            return []

        # gather all comment references
        comments_responses = await asyncio.gather(*[fetch_comments(obj_id) for obj_id in object_ids])
        all_comments = [comment for c_list in comments_responses for comment in c_list]

        # 3) For each comment, fetch the *detailed* text
        async def fetch_comment_details(comment):
            comment_id = comment['id']
            comment_url = f"{API_BASE_URL}comments/{comment_id}?api_key={API_KEY}"

            async with httpx.AsyncClient() as client2:
                detail_resp = await client2.get(comment_url, headers=headers)
                if detail_resp.status_code == 200:
                    detail_data = detail_resp.json()
                    comment_text = detail_data.get("data", {}).get("attributes", {}).get("comment", "")
                    name = comment.get("attributes", {}).get("title", "Anonymous")

                    return {
                        "id": comment_id,
                        "name": name,
                        "text": comment_text
                    }
                return None

        comment_details = await asyncio.gather(
            *[fetch_comment_details(c) for c in all_comments]
        )
        comments_list = [c for c in comment_details if c is not None]

    # Return comments WITHOUT sentiment
    return jsonify(comments_list)

@app.route('/api/analyze_sentiment', methods=['POST'])
def analyze_comments_sentiment():
    """
    Receives a list of comment objects or strings in JSON
    and returns them with sentiment labels/colors.
    """
    data = request.get_json()
    if not data or "comments" not in data:
        return jsonify({"error": "No 'comments' field found in JSON."}), 400

    comments = data["comments"]
    analyzed_results = []

    for comment in comments:
        text = comment.get("text", "")
        try:
            score = analyze_sentiment(text)
            label, color = sentiment_label_and_color(score)
        except (GoogleAPICallError, RetryError) as e:
            print(f"Google NLP error: {e}")
            label, color, score = "error", "#808080", 0

        analyzed_results.append({
            "id": comment.get("id", ""),
            "name": comment.get("name", "Anonymous"),
            "text": text,
            "sentiment": label,
            "score": score,
            "color": color
        })

    return jsonify(analyzed_results)

def analyze_sentiment(text_content: str) -> float:
    """
    Returns a sentiment score between -1.0 (very negative) and +1.0 (very positive).
    Uses the Google Cloud Natural Language API.
    """
    # Initialize the Google Cloud Natural Language client
    client = language_v2.LanguageServiceClient()

    # Construct document
    document = {
        "content": text_content,
        "type_": language_v2.Document.Type.PLAIN_TEXT,
        "language_code": "en"
    }

    response = client.analyze_sentiment(
        request={"document": document, "encoding_type": language_v2.EncodingType.UTF8}
    )

    # The sentiment score is in response.document_sentiment.score
    # Range: -1.0 (negative) to 1.0 (positive)
    return response.document_sentiment.score

def sentiment_label_and_color(score: float):
    """
    Convert a sentiment score (-1 to 1) into a label and a color.
    """
    if score < -0.2:
        # Negative
        return "negative", "#FF0000"  # Red
    elif score > 0.2:
        # Positive
        return "positive", "#00FF00"  # Green
    else:
        # Neutral
        return "neutral", "#FFFF00"   # Yellow


@app.route('/api/docket_abstract/<docket_id>', methods=['GET'])
async def docket_abstract(docket_id):
    headers = {"X-Api-Key": API_KEY}
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


@app.route('/api/comments/<docket_id>', methods=['GET'])
async def comments(docket_id):
    headers = {"X-Api-Key": API_KEY}
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 20, type=int)
    documents_url = f"{API_BASE_URL}documents?filter[docketId]={docket_id}&page[size]={limit}&page[number]={page}&api_key={API_KEY}"

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
            comments_url = f"{API_BASE_URL}comments?filter[commentOnId]={object_id}&page[size]={limit}&page[number]={page}&api_key={API_KEY}"
            response = await client.get(comments_url, headers=headers)
            if response.status_code == 200:
                return response.json().get('data', [])
            return []

        comments_responses = await asyncio.gather(*[fetch_comments(obj_id) for obj_id in object_ids])
        all_comments = [comment for c_list in comments_responses for comment in c_list]

        async def fetch_comment_details(comment):
            comment_id = comment['id']
            comment_url = f"{API_BASE_URL}comments/{comment_id}?api_key={API_KEY}"

            async with httpx.AsyncClient() as client2:
                resp = await client2.get(comment_url, headers=headers)
                if resp.status_code == 200:
                    comment_data = resp.json()
                    comment_text = comment_data.get("data", {}).get("attributes", {}).get("comment", "")
                    name = comment.get("attributes", {}).get("title", "Anonymous")

                    # Synchronous sentiment call inside an async function
                    # (Blocks the event loop but simplest example)
                    try:
                        score = analyze_sentiment(comment_text)
                        label, color = sentiment_label_and_color(score)
                    except (GoogleAPICallError, RetryError) as e:
                        print(f"Google NLP error: {e}")
                        label, color = "error", "#808080"

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
    headers = {"X-Api-Key": API_KEY}
    async with httpx.AsyncClient() as client:
        dockets_response = await client.get(f"{API_BASE_URL}dockets?sort=-lastModifiedDate&filter[docketType]=Rulemaking&filter[agencyId]={agency}&api_key={API_KEY}", headers=headers)
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

    headers = {"X-Api-Key": API_KEY}
    search_url = f"{API_BASE_URL}documents?filter[searchTerm]={term}&api_key={API_KEY}"

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



if __name__ == '__main__':
    import asyncio
    asyncio.run(app.run(debug=True, host='0.0.0.0'))
