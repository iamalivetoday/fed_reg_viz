import sys
import subprocess
import requests
import json
import time
import datetime
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

api_key = 'YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4'
comments = []
start_date = datetime.date(2016, 8, 1)
end_date = datetime.date(2018, 8, 1)
current_date = end_date
file_index = 7
max_file_size = 3 * 1024 * 1024  # 3MB in bytes
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

def save_comments_to_file(comments, file_index):
    print(f"Saving comments to comments{file_index}.json")
    with open(f'comments/comments{file_index}.json', 'w') as f:
        json.dump(comments, f, indent=2)

def check_file_size(file_index):
    file_path = f'comments/comments{file_index}.json'
    if os.path.exists(file_path) and os.path.getsize(file_path) >= max_file_size:
        return True
    return False

# Fetching comment ids and then getting comment text
comment_counter = 0
while current_date > start_date:
    next_date = current_date - datetime.timedelta(days=30)
    for i in range(1, 5):  # Adjust the range as needed
        url = f'https://api.regulations.gov/v4/comments?filter[postedDate]={current_date}&page[size]=100&page[number]={i}&api_key={api_key}'
        response = make_request(url)
        if response and response.status_code == 200:
            data = response.json()
            print(f"Fetched data for {current_date} to {next_date}, page {i}")
            for item in tqdm(data['data'], desc="Fetching comments"):
                comment_id = item['id']
                comment = fetch_comment(comment_id)
                if comment:
                    docket_abstract = fetch_docket_abstract(comment['docketId'])
                    comment['docAbstract'] = docket_abstract
                    comments.append(comment)
                    comment_counter += 1
                    if comment_counter % 100 == 0:
                        print(f"Comment #{comment_counter}: {comment}")
                    if comment_counter % 200 == 0:
                        save_comments_to_file(comments, file_index)
                        file_index += 1
                        comments = []
                    time.sleep(0.1)  # Be polite and avoid too many requests per second

                if check_file_size(file_index):
                    save_comments_to_file(comments, file_index)
                    file_index += 1
                    comments = []
        else:
            print(f"Request for {current_date} to {next_date}, page {i} failed.")
    current_date = next_date

# Save remaining comments
if comments:
    save_comments_to_file(comments, file_index)

print('Done! Total comments fetched:', len(comments))
