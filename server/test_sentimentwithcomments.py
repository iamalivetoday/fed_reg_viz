import requests

# 1) Get comments from your comments endpoint
comments_response = requests.get("http://127.0.0.1:5000/api/comments/FTC-2023-0026")
comments_list = comments_response.json()  # This is the raw array

# 2) Post them to /api/analyze_sentiment
payload = {"comments": comments_list}
analysis_response = requests.post(
    "http://127.0.0.1:5000/api/analyze_sentiment",
    json=payload
)
analyzed_comments = analysis_response.json()
print(analyzed_comments)