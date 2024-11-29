from fastapi import FastAPI, HTTPException, Query
import httpx

API_BASE_URL = "https://api.regulations.gov/v4/"
API_KEY = "YauEoriccK04skfmgd1wTAuHeXQ4dy48dzck8Wi4"

app = FastAPI()

@app.get("/api/docket_abstract/{docket_id}")
async def docket_abstract(docket_id: str):
    headers = {"X-Api-Key": API_KEY}
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_BASE_URL}dockets/{docket_id}", headers=headers)
    if response.status_code == 200:
        docket_data = response.json()
        dk_abstract = docket_data.get("data", {}).get("attributes", {}).get("dkAbstract", "Abstract not found.")
        return {"abstract": dk_abstract}
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to retrieve docket")

@app.get("/api/comments/{docket_id}")
async def comments(docket_id: str, page: int = Query(1), limit: int = Query(20)):
    headers = {"X-Api-Key": API_KEY}
    documents_url = f"{API_BASE_URL}documents?filter[docketId]={docket_id}&page[size]={limit}&page[number]={page}&api_key={API_KEY}"
    comments_list = []

    async with httpx.AsyncClient() as client:
        documents_response = await client.get(documents_url, headers=headers)
        if documents_response.status_code == 200:
            documents_data = documents_response.json()
            for document in documents_data["data"]:
                if "attributes" in document and "objectId" in document["attributes"]:
                    object_id = document["attributes"]["objectId"]
                    comments_url = f"{API_BASE_URL}comments?filter[commentOnId]={object_id}&page[size]={limit}&page[number]={page}&api_key={API_KEY}"
                    comments_response = await client.get(comments_url, headers=headers)
                    if comments_response.status_code == 200:
                        comments_data = comments_response.json()
                        for comment_summary in comments_data["data"]:
                            comment_id = comment_summary["id"]
                            comment_detail_url = f"{API_BASE_URL}comments/{comment_id}?api_key={API_KEY}"
                            comment_detail_response = await client.get(comment_detail_url, headers=headers)
                            if comment_detail_response.status_code == 200:
                                comment_detail_data = comment_detail_response.json()
                                comment_text = comment_detail_data.get("data", {}).get("attributes", {}).get("comment", "")
                                comments_list.append({"id": comment_id, "text": comment_text})
        else:
            raise HTTPException(status_code=documents_response.status_code, detail="Failed to retrieve documents")

    return comments_list

@app.get("/")
async def home():
    return {"message": "Welcome to FastAPI"}