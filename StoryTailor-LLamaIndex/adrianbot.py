#########################################################################################################
#    Run the following command in your terminal to set the environment variable OPENAI_API_KEY:
#    export OPENAI_API_KEY="PASTE_HERE"
#########################################################################################################
import os
from llamaindex import GPTSimpleVectorIndex
import openai

# Set your OpenAI API key from the environment variable
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Function to create an index and query ChatGPT
def query_chatgpt(query):
    # Initialize the GPTSimpleVectorIndex (make sure you have a context or existing index for this)
    index = GPTSimpleVectorIndex()

    # Run the query
    response = index.query(query)

    # Print or return the response
    print("Response from ChatGPT:", response)

# Example usage
if __name__ == "__main__":
    user_query = input("Enter your query: ")
    query_chatgpt(user_query)