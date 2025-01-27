# test_nlp.py
from google.cloud import language_v2
client = language_v2.LanguageServiceClient()

document = {
    "content": "bad evil hatred bad i hate you i hate you i am going to kill you!",
    "type_": language_v2.Document.Type.PLAIN_TEXT,
    "language_code": "en",
}

response = client.analyze_sentiment(request={"document": document})
print("Score:", response.document_sentiment.score)
