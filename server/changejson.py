import json

# Load the JSON file
with open('comments4.json', 'r') as file:
    data = json.load(file)

# Remove the 'documentType' field from each item
for item in data:
    if 'documentType' in item:
        del item['documentType']

# Save the modified JSON back to the original file
with open('comments4.json', 'w') as file:
    json.dump(data, file, indent=2)

print("documentType field removed from all items in the original file.")
