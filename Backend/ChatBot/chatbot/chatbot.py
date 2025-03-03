from DiseaseRelatedData import identify_disease, recommend_treatment
import re

def chatbot():
    print("🤖 Chatbot: Hi! Can I help you?")
    
    while True:
        user_response = input("You (yes/no): ").strip().lower()
        
        if user_response in ["no", "n"]:
            print("🤖 Chatbot: Okay, stay healthy! 😊")
            return
        elif user_response not in ["yes", "y"]:
            print("🤖 Chatbot: Please enter 'yes' or 'no'.")
            continue
        
        while True:
            print("🤖 Chatbot: Can you describe your physical illness?")
            user_input = input("You: ").strip()
            
            # Detect disease from the user's input
            disease = identify_disease(user_input)
            
            if disease:
                recommendation = recommend_treatment(disease)
                print(f"🤖 Chatbot: {recommendation}")
            else:
                print("🤖 Chatbot: I'm only here to help with **physical illnesses**.")
                
                # Check if user says they don’t have any physical illness
                if re.search(r"(don't have|haven't|no physical illness|not sick|not ill)", user_input, re.IGNORECASE):
                    print("🤖 Chatbot: No worries! Stay safe and take care. 😊")
                    return  # Exit the chatbot gracefully
                
                return  # Exit instead of asking again (Fix for repetition issue)

            while True:
                user_confirmation = input("You: ").strip().lower()
                
                # Handling user gratitude/acknowledgment
                if user_confirmation in ["okay", "ok", "thank you", "thanks", "alright"]:
                    break  # Continue to the next step
                
                # Check if user asks about how to choose a specialist
                if re.search(r"(how.*(choose|get|find|pick|select).*?(physiotherapist|gym trainer|specialist|doctor))|"
                             r"(where.*(get|find).*?(physiotherapist|gym trainer|specialist|doctor))|"
                             r"(how.*do.*that)", user_confirmation, re.IGNORECASE):
                    print("🤖 Chatbot: You can choose a **physiotherapist** or **gym trainer** through our **WellZone Lanka** website. 🌐")
                    continue  # Allow follow-up questions
                
            # Now, ask if they have another illness
            while True:
                print("🤖 Chatbot: Do you have another physical illness?")
                another_request = input("You (yes/no): ").strip().lower()

                if another_request in ["no", "n"]:
                    print("🤖 Chatbot: Alright! Stay safe and take care. 😊")
                    return
                elif another_request in ["yes", "y"]:
                    break  # Go back to asking about illness
                else:
                    print("🤖 Chatbot: Please enter 'yes' or 'no'.")

if __name__ == "__main__":
    chatbot()
