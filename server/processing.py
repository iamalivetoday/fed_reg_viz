import re
import pandas as pd
import os
import json
from tqdm import tqdm
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import numpy as np

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

    # Map labels to binary categories (e.g., in favor vs opposed) and filter out neutral labels
    label_mapping = {
        'verypos': 'in favor',
        'pos': 'in favor',
        'neut': 'neutral',
        'neg': 'opposed',
        'veryneg': 'opposed'
    }
    all_data['binary_label'] = all_data['label'].map(label_mapping)
    all_data = all_data[all_data['binary_label'] != 'neutral']


    # Check for any labels that were not mapped
    unmapped_labels = all_data[all_data['binary_label'].isna()]['label'].unique()
    if len(unmapped_labels) > 0:
        print(f"Unmapped labels found: {unmapped_labels}")

    # Remove rows with NaN values in the binary_label column
    all_data = all_data.dropna(subset=['binary_label'])

    # Concatenate cleaned_commenttext and cleaned_docAbstract for vectorization
    all_data['combined_text'] = all_data['cleaned_commenttext'] + " " + all_data['cleaned_docAbstract']

    # Vectorize the text data using tf-idf

    #tf = frequency of word in a doc / total number of words in that doc
    #df = documents containing word / total number of documents
    #idf = log(total number of documents / documents containing word w)
     
    vectorizer = TfidfVectorizer(max_features=5000)  # Limit to 5000 features for efficiency
    X = vectorizer.fit_transform(all_data['combined_text'])

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, all_data['binary_label'], test_size=0.2, random_state=42)

    # Build and train a logistic regression classifier
    classifier = LogisticRegression()
    classifier.fit(X_train, y_train)

    # Make predictions on the testing set
    y_pred = classifier.predict(X_test)

    # Evaluate the model
    print(classification_report(y_test, y_pred))

    # Print feature importances (optional)
    feature_names = np.array(vectorizer.get_feature_names_out())
    # retrieves the names of the features (words) from the TF-IDF vectorizer
    sorted_coef_index = classifier.coef_[0].argsort()
    print('Top positive words:\n', feature_names[sorted_coef_index[:-11:-1]])
    #selects the top 10 indices for positive coefficients
    #from the end of the array
    print('Top negative words:\n', feature_names[sorted_coef_index[:10]])
    #selects the top 10 indices for negative coefficients
    #from the start of the array

    #precision = total positive / (total positive + false positive)
    #recall = total positive / (total positive + false negative)

    #f1 score = 2 / ((1/precision) + (1/recall))
    #calculated as the harmonic mean of the precision and recall scores
    #0- 100%

else:
    print("No valid JSON files found.")

# Save the vectorizer and classifier
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')
joblib.dump(best_classifier, 'logistic_regression_model.pkl')