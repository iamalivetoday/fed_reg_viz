import os

# Define the path to the directory
directory = './comments'

# Loop through all files in the directory
for filename in os.listdir(directory):
    if filename.endswith('.json'):
        # Extract the number from the filename
        file_number = int(''.join(filter(str.isdigit, filename)))
        # Delete files with numbers greater than 44
        if file_number > 44:
            file_path = os.path.join(directory, filename)
            try:
                os.remove(file_path)
                print(f"Deleted file: {filename}")
            except Exception as e:
                print(f"Error deleting file {filename}: {e}")
