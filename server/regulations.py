import httpx
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

# API Key and Base URL setup
API_BASE_URL = "https://api.regulations.gov/v4/"
API_KEY = "YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4"

app = Flask(__name__)
CORS(app, supports_credentials=True, logging=True)

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
    comments_list = []

    async with httpx.AsyncClient() as client:
        documents_response = await client.get(documents_url, headers=headers)
        if documents_response.status_code == 200:
            documents_data = documents_response.json()
            for document in documents_data['data']:
                if 'attributes' in document and 'objectId' in document['attributes']:
                    object_id = document['attributes']['objectId']
                    comments_url = f"{API_BASE_URL}comments?filter[commentOnId]={object_id}&page[size]={limit}&page[number]={page}&api_key={API_KEY}"
                    comments_response = await client.get(comments_url, headers=headers)
                    if comments_response.status_code == 200:
                        comments_data = comments_response.json()
                        for comment_summary in comments_data['data']:
                            comment_id = comment_summary['id']
                            names_unprocessed = comment_summary['attributes']['title'].split()
                            name = "Anonymous" if len(names_unprocessed) == 3 else " ".join(names_unprocessed[-2:])
                            comment_detail_url = f"{API_BASE_URL}comments/{comment_id}?api_key={API_KEY}"
                            comment_detail_response = await client.get(comment_detail_url, headers=headers)
                            if comment_detail_response.status_code == 200:
                                comment_detail_data = comment_detail_response.json()
                                comment_text = comment_detail_data.get("data", {}).get("attributes", {}).get("comment", "")
                                this_comment = {
                                    "id": comment_id,
                                    "name": name,
                                    "color": '#647c00',
                                    "text": comment_text
                                }
                                comments_list.append(this_comment)
                            else:
                                return jsonify({"error": f"Failed to retrieve details for comment ID {comment_id}. Status code: {comment_detail_response.status_code}"})
                    else:
                        return jsonify({"error": f"Failed to retrieve comments for object ID {object_id}. Status code: {comments_response.status_code}"})
                else:
                    return jsonify({"error": "Document does not have an objectId attribute."})
        else:
            return jsonify({"error": f"Failed to retrieve documents for docket ID {docket_id}. Status code: {documents_response.status_code}"})

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
