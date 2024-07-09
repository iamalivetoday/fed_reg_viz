import re
import pandas as pd
import os
import json
from tqdm import tqdm

# Define the path to the directory
directory = './comments'

# Initialize an empty list to store dataframes
dataframes = []

# Loop through all files in the directory with error handling
for filename in tqdm(os.listdir(directory), desc="Reading JSON files"):
    if filename.endswith('.json'):
        file_path = os.path.join(directory, filename)
        try:
            with open(file_path, 'r') as file:
                data = json.load(file)
                if data:  # Check if the file is not empty
                    df = pd.DataFrame(data)
                    print(f"Loaded file {filename} with columns: {df.columns}")
                    # Ensure required columns are present
                    if 'text' in df.columns:
                        df['docAbstract'] = df['docAbstract'].fillna("")
                        dataframes.append(df[['text', 'docAbstract', 'label']])
                        print(f"Added data from file {filename}")
                    else:
                        print(f"File {filename} missing required columns. First few rows:")
                        print(df.head())
                else:
                    print(f"Skipping empty file {filename}")
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON in file {filename}: {e}")
        except Exception as e:
            print(f"Unexpected error with file {filename}: {e}")

# Define a new cleaning function without NLTK dependencies
def simple_clean_text(text):
    if not isinstance(text, str):
        text = str(text)
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    text = re.sub(r'\d+', '', text)  # Remove numbers
    text = text.lower()  # Convert to lowercase
    return text

# Define a simple tokenization function
def simple_tokenize_text(text):
    return text.split()

# Concatenate all dataframes
if dataframes:
    all_data = pd.concat(dataframes, ignore_index=True)

    # Apply preprocessing steps with progress bar
    tqdm.pandas(desc="Cleaning and Tokenizing")

    all_data['cleaned_commenttext'] = all_data['text'].progress_apply(simple_clean_text)
    all_data['cleaned_docAbstract'] = all_data['docAbstract'].progress_apply(simple_clean_text)

    all_data['tokenized_commenttext'] = all_data['cleaned_commenttext'].progress_apply(simple_tokenize_text)
    all_data['tokenized_docAbstract'] = all_data['cleaned_docAbstract'].progress_apply(simple_tokenize_text)

    # Print the number of rows and columns
    print(f"Number of rows: {all_data.shape[0]}")
    print(f"Number of columns: {all_data.shape[1]}")

    # Display the first few rows of the dataframe
    print(all_data.head())

    # Display basic information about the dataframe
    print(all_data.info())
else:
    print("No valid JSON files found.")
