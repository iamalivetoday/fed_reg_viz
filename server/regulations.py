import requests
import json
from textblob import TextBlob
import textblob.download_corpora
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

# API Key and Base URL setup
API_BASE_URL = "https://api.regulations.gov/v4/"
API_KEY = "DEMO_KEY"  # Replace with your actual API key
#API_KEY = "YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4"

app = Flask(__name__)
CORS(app, supports_credentials=True, logging=True)

@app.route('/api/docket_abstract/<docket_id>', methods=['GET'])
@cross_origin()  # Allows CORS for this route
def docket_abstract(docket_id):
    headers = {"X-Api-Key": API_KEY}
    response = requests.get(f"{API_BASE_URL}dockets/{docket_id}", headers=headers)

    if response.status_code == 200:
        docket_data = response.json()
        dk_abstract = docket_data.get("data", {}).get("attributes", {}).get("dkAbstract", "Abstract not found.")
        print(dk_abstract)
        response = jsonify({"abstract": dk_abstract})  # Ensure this matches client expectation
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    else:
        print(f"Failed to retrieve docket. Status code: {response.status_code}")
        return jsonify({"error": "Failed to retrieve docket"}), response.status_code

@app.route('/')
def home():
    return 'Welcome to the Flask API!'




def get_comments(docket_id):
  documents_url = f"{API_BASE_URL}documents?filter[docketId]={docket_id}&api_key={API_KEY}"

  comments_list = []

  # Fetch the documents
  documents_response = requests.get(documents_url)
  if documents_response.status_code == 200:
      documents_data = documents_response.json()

      # Iterate through the documents to get comments for each
      for document in documents_data['data']:
          # Check if 'attributes' and the specific 'objectId' attribute exists for the document
          if 'attributes' in document and 'objectId' in document['attributes']:
              object_id = document['attributes']['objectId']
              
              # Construct the URL to fetch comments for the document using its objectId
              comments_url = f"{API_BASE_URL}comments?filter[commentOnId]={object_id}&api_key={API_KEY}"
              
              # Fetch the comments
              comments_response = requests.get(comments_url)
              if comments_response.status_code == 200:
                  comments_data = comments_response.json()

                  # Now fetch details for each comment
                  for comment_summary in comments_data['data']:
                      comment_id = comment_summary['id']
                      names_unprocessed = comment_summary['attributes']['title'].split()
                      name = ""
                      if len(names_unprocessed) == 3:
                        name = "Anonymous"
                      else:
                        lastname = names_unprocessed[2]
                        if(lastname[-1] == ","):
                          lastname[:-1]
                        name = names_unprocessed[-1] + " " + lastname
                      comment_detail_url = f"{API_BASE_URL}comments/{comment_id}?api_key={API_KEY}"

                      # Fetch the detailed comment
                      comment_detail_response = requests.get(comment_detail_url)
                      if comment_detail_response.status_code == 200:
                          comment_detail_data = comment_detail_response.json()
                          # Extract the comment text. Adjust the key path as necessary based on the response structure
                          comment_text = comment_detail_data.get("data", {}).get("attributes", {}).get("comment", "No comment text found")
                          #print(f"Name: {name}, Comment ID: {comment_id}, Comment Text: {comment_text}")
                          this_comment = [comment_id, name, comment_text]
                          comments_list.append(this_comment)

                      else:
                          print(f"Failed to retrieve details for comment ID {comment_id}. Status code: {comment_detail_response.status_code}")
              else:
                  print(f"Failed to retrieve comments for object ID {object_id}. Status code: {comments_response.status_code}")
          else:
              print("Document does not have an objectId attribute.")
  else:
      print(f"Failed to retrieve documents for docket ID {docket_id}. Status code: {documents_response.status_code}")
  return comments_list


def perform_sentiment_analysis(comments):
    sentiment_results = []
    
    for c in comments:
      blob = TextBlob(c[2])
      sentiment = blob.sentiment
      sentiment_results.append((c[0], c[1], c[2], sentiment.polarity, sentiment.subjectivity))
    
    return sentiment_results

#docket_id = "FTC-2024-0018"
#docket_id = "EPA-HQ-OAR-2011-0028"  # Replace with the docket ID you're interested in

# Get docket summary
#docket_summary = get_docket_summary(docket_id)
#print(docket_summary)

# Get comments
#comments = get_comments(docket_id)
#print(comments)
# Perform sentiment analysis
"""
sentiment_results = perform_sentiment_analysis(comments)
for result in sentiment_results:
    print(f"Comment ID: {result[0]}, Polarity: {result[2]}, Subjectivity: {result[3]}")
"""


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
