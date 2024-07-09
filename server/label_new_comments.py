import re
import pandas as pd
import json
import os
import joblib

# Load the vectorizer and classifier
vectorizer_path = 'tfidf_vectorizer.pkl'
classifier_path = 'logistic_regression_model.pkl'

if not os.path.exists(vectorizer_path) or not os.path.exists(classifier_path):
    print("Model files not found. Ensure you have trained and saved the model.")
else:
    vectorizer = joblib.load(vectorizer_path)
    classifier = joblib.load(classifier_path)

    # Define the path to the directory
    directory = './comments'

    # Define the path to the new data file
    new_data_file = 'comments45.json'
    new_data_path = os.path.join(directory, new_data_file)

    # Load new data
    with open(new_data_path, 'r') as file:
        new_data = json.load(file)

    new_df = pd.DataFrame(new_data)

    # Preprocess the new data
    def simple_clean_text(text):
        if not isinstance(text, str):
            text = str(text)
        text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
        text = re.sub(r'\d+', '', text)  # Remove numbers
        text = text.lower()  # Convert to lowercase
        return text

    new_df['docAbstract'] = new_df['docAbstract'].fillna("")
    new_df['cleaned_commenttext'] = new_df['text'].apply(simple_clean_text)
    new_df['cleaned_docAbstract'] = new_df['docAbstract'].apply(simple_clean_text)

    # Combine the cleaned text for vectorization
    new_df['combined_text'] = new_df['cleaned_commenttext'] + " " + new_df['cleaned_docAbstract']

    # Transform the new data using the fitted TF-IDF vectorizer
    X_new = vectorizer.transform(new_df['combined_text'])

    # Make predictions on the new data
    new_predictions = classifier.predict(X_new)

    # Add predictions to the dataframe
    new_df['label'] = new_predictions

    # If you want to map back to the original labels (optional)
    reverse_label_mapping = {
        'in favor': 'pos',
        'opposed': 'neg'
    }
    new_df['label'] = new_df['label'].map(reverse_label_mapping)

    # Display the new data with predictions
    print(new_df[['text', 'docAbstract', 'label']])

    # Save the results to a new JSON file (optional)
    new_df.to_json('comments45.json', orient='records', lines=True)
