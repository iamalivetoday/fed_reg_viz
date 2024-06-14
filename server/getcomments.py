import requests
import json
import os
import time

api_key = 'YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4'
comments = []

# Function to fetch comments using commentId
def fetch_comment(comment_id):
    url = f'https://api.regulations.gov/v4/comments/{comment_id}?api_key={api_key}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return {
            "text": data['data']['attributes']['comment'],
            "label": ""
        }
    else:
        print(f"Couldn't get comment for ID {comment_id}. Status code: {response.status_code}")
    return None

# Fetching comment ids and then getting comment text
for i in range(1, 11):  # 10 pages * 100 comments per page = 1000 comments
    url = f'https://api.regulations.gov/v4/comments?sort=-postedDate&page[size]=100&page[number]={i}&api_key={api_key}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(f"Fetched data for page {i}")
        for item in data['data']:
            comment_id = item['id']
            comment = fetch_comment(comment_id)
            if comment:
                comments.append(comment)
            time.sleep(0.1)  # Be polite and avoid too many requests per second
    else:
        print(f"Request for page {i} failed. Status code: {response.status_code}")
        print(response.json())  # Print response to understand why it failed

with open('commentsdata.json', 'w') as f:
    json.dump(comments, f, indent=2)

print('Done!')
