"""import requests
import json
import datetime

# API Key and Base URL setup
api_base_url = "https://api.regulations.gov/v4/"
api_key = "api_key=YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4"  # Replace with your actual API key

# Get all dockets for a specific agency
agency_id = "EPA"  # Example for EPA
epa_req = f"{api_base_url}dockets?filter[agencyId]={agency_id}&{api_key}"

# Retrieve dockets
epa_dockets_response = requests.get(epa_req)
if epa_dockets_response.status_code == 200:
    epa_dockets_data = epa_dockets_response.json()

    # Iterate through dockets to get documents
    for docket in epa_dockets_data['data']:
        docket_id = docket['id']
        documents_req_url = f"{api_base_url}documents?filter[docketId]={docket_id}&{api_key}"

        # Retrieve documents for docket
        documents_response = requests.get(documents_req_url)
        if documents_response.status_code == 200:
            documents_data = documents_response.json()

            # Iterate through documents to get comments
            for document in documents_data['data']:
                document_id = document['id']
                comments_req_url = f"{api_base_url}comments?filter[commentOnId]={document_id}&{api_key}"

                # Retrieve comments for document
                comments_response = requests.get(comments_req_url)
                if comments_response.status_code == 200:
                    comments_data = comments_response.json()

                    # Process and print comments data
                    print(comments_data)
else:
    print(f"Failed to retrieve dockets. Status code: {epa_dockets_response.status_code}")

"""
import requests
import json

# API Key and Base URL setup
api_base_url = "https://api.regulations.gov/v4/"
api_key = "api_key=YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4"  # Replace with your actual API key

# Specify the docket ID you're interested in
docket_id = "FAA-2018-1084"  # Example docket ID

# Construct the URL to fetch documents for the specified docket
documents_url = f"{api_base_url}documents?filter[docketId]={docket_id}&{api_key}"

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
            comments_url = f"{api_base_url}comments?filter[commentOnId]={object_id}&{api_key}"
            
            # Fetch the comments
            comments_response = requests.get(comments_url)
            if comments_response.status_code == 200:
                comments_data = comments_response.json()

                # Now fetch details for each comment to get the actual text
                for comment_summary in comments_data['data']:
                    comment_id = comment_summary['id']
                    comment_detail_url = f"{api_base_url}comments/{comment_id}?{api_key}"

                    # Fetch the detailed comment
                    comment_detail_response = requests.get(comment_detail_url)
                    if comment_detail_response.status_code == 200:
                        comment_detail_data = comment_detail_response.json()
                        # Extract the comment text. Adjust the key path as necessary based on the response structure
                        comment_text = comment_detail_data.get("data", {}).get("attributes", {}).get("comment", "No comment text found")
                        print(f"Comment ID: {comment_id}, Comment Text: {comment_text}")
                    else:
                        print(f"Failed to retrieve details for comment ID {comment_id}. Status code: {comment_detail_response.status_code}")
            else:
                print(f"Failed to retrieve comments for object ID {object_id}. Status code: {comments_response.status_code}")
        else:
            print("Document does not have an objectId attribute.")
else:
    print(f"Failed to retrieve documents for docket ID {docket_id}. Status code: {documents_response.status_code}")