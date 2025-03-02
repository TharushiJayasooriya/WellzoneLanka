# chatbot.py
import DiseaseRelatedData

def chatbot_response(user_input):
    """Process user input and return chatbot response."""
    user_input = user_input.lower()
    
    # Check for matching disease
    for disease, synonyms in DiseaseRelatedData.PHYSICAL_DISEASE_SYNONYMS.items():
        if any(word in user_input for word in synonyms):
            return DiseaseRelatedData.recommend_treatment(disease)

    return "I'm not sure about that. Can you describe your symptoms in more detail? 🤔"

# Testing the chatbot interaction
if __name__ == "__main__":
    print("🤖 Chatbot: Hello! Describe your pain, and I'll recommend the best treatment.")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("🤖 Chatbot: Take care! Goodbye! 👋")
            break
        response = chatbot_response(user_input)
        print(f"🤖 Chatbot: {response}")
