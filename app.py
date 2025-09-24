# app.py

import json
from conversation.tutor import AITutor

def load_chapter_structure(file_path: str):
    """Loads the chapter structure from the JSON file."""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
        return None

def display_lessons_and_get_choice(chapter_data):
    """Displays available lessons and prompts the user for a choice."""
    print("Welcome to your AI History Tutor!")
    print("="*30)
    
    lesson_map = {}
    count = 1
    for module in chapter_data["modules"]:
        print(f"\n--- {module['module_title']} ---")
        for lesson in module["lessons"]:
            print(f"{count}. {lesson}")
            lesson_map[count] = lesson
            count += 1
    
    while True:
        try:
            choice = int(input("\nPlease enter the number of the lesson you want to study: "))
            if choice in lesson_map:
                return lesson_map[choice]
            else:
                print("Invalid number. Please try again.")
        except ValueError:
            print("That's not a number! Please enter a valid number.")

def main():
    """Main function to run the conversational tutor application."""
    chapter_data = load_chapter_structure("data/chapter_structure.json")
    if not chapter_data:
        return

    selected_lesson = display_lessons_and_get_choice(chapter_data)
    print(f"\nGreat! Initializing a session on '{selected_lesson}'...")
    print("-" * 50)

    # Initialize the AI Tutor for the selected lesson
    tutor = AITutor(topic=selected_lesson)
    
    # Print the AI's opening message
    print(f"AI Tutor: {tutor.get_starting_message()}")

    # Start the conversation loop
    while True:
        user_input = input("You: ")
        
        if user_input.lower() in ['exit', 'quit', 'bye']:
            print("AI Tutor: Happy studying! See you next time.")
            break
            
        ai_response = tutor.chat(user_input)
        print(f"\nAI Tutor: {ai_response}\n")
        
        # Check if the AI has decided to end the conversation
        if "you have now learnt about this topic" in ai_response.lower() or "excellent work!" in ai_response.lower():
            print("AI Tutor: This session has concluded. Feel free to start a new topic!")
            break

if __name__ == "__main__":
    main()