import json

# Load the existing comments data
with open('comments2.json', 'r') as f:
    comments = json.load(f)

# Add "documentType" field to each comment
for comment in comments:
    comment["documentType"] = "Proposed Rule"

# Save the updated comments data
with open('comments.json', 'w') as f:
    json.dump(comments, f, indent=2)

print('Done! "documentType" field added to each comment.')
