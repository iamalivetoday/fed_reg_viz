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
                    # Filter out rows without the required columns
                    if 'commenttext' in df.columns and 'docAbstract' in df.columns:
                        df = df[['commenttext', 'docAbstract', 'label']].dropna(subset=['commenttext', 'docAbstract'])
                        dataframes.append(df)
                    else:
                        print(f"File {filename} missing required columns")
                else:
                    print(f"Skipping empty file {filename}")
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON in file {filename}: {e}")
        except Exception as e:
            print(f"Unexpected error with file {filename}: {e}")

# Define a new cleaning function without NLTK dependencies
def simple_clean_text(text):
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

    all_data['cleaned_commenttext'] = all_data['commenttext'].progress_apply(simple_clean_text)
    all_data['cleaned_docAbstract'] = all_data['docAbstract'].progress_apply(simple_clean_text)

    all_data['tokenized_commenttext'] = all_data['cleaned_commenttext'].progress_apply(simple_tokenize_text)
    all_data['tokenized_docAbstract'] = all_data['cleaned_docAbstract'].progress_apply(simple_tokenize_text)

    # Display the preprocessed data
    import ace_tools as tools; tools.display_dataframe_to_user(name="Preprocessed All Comments", dataframe=all_data)

    # Print the number of rows and columns
    print(f"Number of rows: {all_data.shape[0]}")
    print(f"Number of columns: {all_data.shape[1]}")

    # Display the first few rows of the dataframe
    print(all_data.head())
else:
    print("No valid JSON files found.")
