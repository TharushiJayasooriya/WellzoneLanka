from DiseaseRelatedData import identify_disease, recommend_treatment
import re

def chatbot():
    print("🤖 Chatbot: Hi! Can I help you?")
    
    while True:
        user_response = input("You (yes/no): ").strip().lower()
        
        if user_response in ["no", "n"]:
            print("🤖 Chatbot: Okay, stay healthy! 😊")
            break
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
                print("🤖 Chatbot: I'm only here to help with **physical illnesses**. Please describe a physical issue.")

            while True:
                user_confirmation = input("You: ").strip().lower()
                
                if user_confirmation in ["okay", "ok", "thank you", "thanks", "alright"]:
                    break  # Continue to the next step
                
                # Check if user asks about how to choose a specialist
                if re.search(r"how.*choose.*(physiotherapist|gym trainer)", user_confirmation):
                    print("🤖 Chatbot: You can choose a physiotherapist or gym trainer through our **WellZone Lanka** website. 🌐")
                    user_confirmation = input("You: ").strip().lower()
                    if user_confirmation in ["okay", "ok", "thank you", "thanks"]:
                        break
            
            print("🤖 Chatbot: If you have any other physical illness, can you describe it?")
            another_request = input("You: ").strip().lower()
            
            if another_request in ["no", "n"]:
                print("🤖 Chatbot: Alright! Stay safe and take care. 😊")
                return
            elif another_request in ["yes", "y"]:
                continue  # Continue describing another illness
            else:
                print("🤖 Chatbot: Please enter 'yes' or 'no'.")

if __name__ == "__main__":
    chatbot()
