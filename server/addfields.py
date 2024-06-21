import json

# Load the JSON file
file_path = '/mnt/data/commentsdata1.json'

with open(file_path, 'r') as f:
    comments_data = json.load(f)

# Add the new fields
for comment in comments_data:
    comment['docketId'] = ""
    comment['docAbstract'] = ""

# Save the updated JSON file
with open('/mnt/data/commentsdata1_updated.json', 'w') as f:
    json.dump(comments_data, f, indent=2)

print('Done! Updated comments saved to commentsdata1_updated.json')
