# conversation/tutor.py

from .prompts import SYSTEM_PROMPT
from api.client import get_ai_response

class AITutor:
    """
    Manages the state and flow of a conversation with the AI tutor.
    """
    def __init__(self, topic: str):
        self.topic = topic
        self.history = self._initialize_history()

    def _initialize_history(self) -> list:
        """Creates the initial prompt and conversation starter."""
        initial_prompt = SYSTEM_PROMPT.format(topic=self.topic)
        
        # The history needs to be in a specific format for the Gemini API
        return [
            # The system prompt is sent as the first user message
            {'role': 'user', 'parts': [initial_prompt]},
            # We then provide the AI's first line to kickstart the conversation
            {'role': 'model', 'parts': [f"Hello! Let's dive into '{self.topic}'. To start, what's one thing you already know or have heard about it?"]}
        ]

    def get_starting_message(self) -> str:
        """Returns the AI's first message to the user."""
        return self.history[-1]['parts'][0]

    def chat(self, user_input: str) -> str:
        """
        Handles a user's message, gets the AI response, and updates history.
        """
        # Add user's message to history
        self.history.append({'role': 'user', 'parts': [user_input]})
        
        # Get AI response
        ai_response = get_ai_response(self.history)
        
        # Add AI's response to history
        self.history.append({'role': 'model', 'parts': [ai_response]})
        
        return ai_response