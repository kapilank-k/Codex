# api/client.py

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- GEMINI API CONFIGURATION ---
try:
    api_key = os.getenv("API_KEY")
    if not api_key:
        raise ValueError("API_KEY not found in .env file")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash') # A fast and capable model
except Exception as e:
    print(f"Error configuring AI model: {e}")
    model = None

def get_ai_response(history: list) -> str:
    """
    Sends the conversation history to the AI model and gets a response.
    
    Args:
        history: A list of message dictionaries representing the conversation.
        
    Returns:
        The AI's text response as a string.
    """
    if not model:
        return "The AI model is not configured. Please check your API key."

    try:
        response = model.generate_content(history)
        return response.text
    except Exception as e:
        print(f"An error occurred while getting AI response: {e}")
        return "Sorry, I encountered an error. Please try again."

# --- HOW TO SWAP TO GROK API ---
#
# When you have your Grok API key and library, you would replace the code above.
# The 'get_ai_response' function signature would remain the same.
#
# EXAMPLE (THIS IS HYPOTHETICAL CODE):
#
# from grok import GrokClient  # Hypothetical library name
#
# api_key = os.getenv("GROK_API_KEY")
# client = GrokClient(api_key=api_key)
#
# def get_ai_response(history: list) -> str:
#     # You would need to transform the Gemini-style history to the format Grok expects.
#     # For many models, it's a list of {'role': 'user'/'assistant', 'content': '...'}
#     grok_messages = []
#     for message in history:
#         # This transformation logic depends on Grok's specific requirements
#         role = "assistant" if message['role'] == 'model' else message['role']
#         grok_messages.append({"role": role, "content": message['parts'][0]})
#
#     try:
#         response = client.chat.completions.create(
#             messages=grok_messages,
#             model="grok-1" # Or whatever the model name is
#         )
#         return response.choices[0].message.content
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return "Sorry, an error occurred with the Grok API."
#