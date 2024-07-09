import sys
import subprocess
import requests
import json
import time
import os
from tqdm import tqdm
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

# Check if tqdm is installed, and install if not
try:
    from tqdm import tqdm
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "tqdm"])
    from tqdm import tqdm

api_key = 'YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4'  # Replace with your actual API key
comments = []
max_comments = 200
requests_made = 0
rate_limit = 2000
time_window = 3600  # 1 hour in seconds
start_time = time.time()

# Function to set up a retry session
def requests_retry_session(
    retries=3,
    backoff_factor=0.3,
    status_forcelist=(500, 502, 504),
    session=None,
):
    session = session or requests.Session()
    retry = Retry(
        total=retries,
        read=retries,
        connect=retries,
        backoff_factor=backoff_factor,
        status_forcelist=status_forcelist,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session

# Function to fetch comments using commentId
def fetch_comment(comment_id):
    url = f'https://api.regulations.gov/v4/comments/{comment_id}?api_key={api_key}'
    response = make_request(url)
    if response and response.status_code == 200:
        data = response.json()
        return {
            "text": data['data']['attributes']['comment'],
            "label": "",
            "docketId": data['data']['attributes']['docketId'],
            "docAbstract": data['data']['attributes'].get('docAbstract', 'Abstract not found.')
        }
    else:
        print(f"Couldn't get comment for ID {comment_id}. Status code: {response.status_code if response else 'N/A'}")
    return None

# Function to fetch docket abstract using docketId
def fetch_docket_abstract(docket_id):
    url = f'https://api.regulations.gov/v4/dockets/{docket_id}?api_key={api_key}'
    response = make_request(url)
    if response and response.status_code == 200:
        docket_data = response.json()
        return docket_data.get("data", {}).get("attributes", {}).get("dkAbstract", "Abstract not found.")
    return "Abstract not found."

def make_request(url):
    global requests_made, start_time
    current_time = time.time()
    elapsed_time = current_time - start_time

    if elapsed_time < time_window:
        if requests_made >= rate_limit:
            time_to_wait = time_window - elapsed_time
            print(f"Rate limit reached. Waiting for {time_to_wait} seconds.")
            time.sleep(time_to_wait)
            requests_made = 0
            start_time = time.time()
    else:
        requests_made = 0
        start_time = time.time()

    try:
        response = requests_retry_session().get(url, timeout=10)  # Timeout to handle hanging requests
        requests_made += 1
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

# Fetching comment ids and then getting comment text
def fetch_comments(docket_id, max_comments):
    url = f'https://api.regulations.gov/v4/comments?filter[docketId]={docket_id}&page[size]=100&api_key={api_key}'
    comments_fetched = []
    page = 1

    while len(comments_fetched) < max_comments:
        response = make_request(url + f"&page[number]={page}")
        if response and response.status_code == 200:
            data = response.json()
            if 'data' not in data or not data['data']:
                break  # No more comments to fetch
            for item in tqdm(data['data'], desc="Fetching comments"):
                comment_id = item['id']
                comment = fetch_comment(comment_id)
                if comment:
                    docket_abstract = fetch_docket_abstract(comment['docketId'])
                    comment['docAbstract'] = docket_abstract
                    comments_fetched.append(comment)
                    if len(comments_fetched) >= max_comments:
                        break
                time.sleep(0.1)  # Be polite and avoid too many requests per second
            page += 1
        else:
            print(f"Failed to fetch comments for page {page}. Status code: {response.status_code if response else 'N/A'}")
            break
    return comments_fetched

# Fetch comments
docket_id = 'FTC-2024-0018'
comments = fetch_comments(docket_id, max_comments)

# Save comments to file
def save_comments_to_file(comments, file_name):
    print(f"Saving comments to {file_name}")
    with open(file_name, 'w') as f:
        json.dump(comments, f, indent=2)

save_comments_to_file(comments, 'comments45.json')

print('Done! Total comments fetched:', len(comments))
