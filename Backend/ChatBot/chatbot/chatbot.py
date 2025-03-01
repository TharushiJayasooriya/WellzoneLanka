from DiseaseRelatedData import find_physical_disease

def chatbot():
    print("Hi! Can I help you?")
    
    while True:
        user_input = input("You (yes/no): ").strip().lower()
        
        if user_input == "no":
            print("Chatbot: Okay, stay healthy! 😊")
            return
        elif user_input == "yes":
            print("Chatbot: If you have a physical illness, can you describe it?")
            
            while True:
                symptoms = input("You: ").strip().lower()

                # Automatically exit if user enters nothing
                if not symptoms:
                    print("Chatbot: Exiting... Take care! 👋")
                    return
                
                # Detect physical disease
                disease = find_physical_disease(symptoms)

                if disease:
                    print(f"Chatbot: It seems like you may have {disease}. You should consider consulting a physiotherapist or gym trainer. 🏥")
                    
                    while True:
                        follow_up = input("You: ").strip().lower()

                        # Automatically exit if user enters nothing
                        if not follow_up:
                            print("Chatbot: Exiting... Take care! 👋")
                            return

                        elif follow_up in ["ok","okay","ok thank you","ok thanks", "okay thank you","thank you","thanks", "nothing"]:
                            print("Chatbot: Do you have any other physical problems? (yes/no)")
                            response = input("You: ").strip().lower()

                            if response == "no":
                                print("Chatbot: Okay, stay healthy! 😊")
                                return
                            elif response == "yes":
                                print("Chatbot: Please describe your other physical illness.")
                            else:
                                print("Chatbot: Please answer with 'yes' or 'no'.")
                        
                        else:
                            new_disease = find_physical_disease(follow_up)
                            if new_disease:
                                print(f"Chatbot: It seems like you may have {new_disease}. You should consider consulting a doctor. 🏥")
                            else:
                                print("Chatbot: Sorry, I can only identify physical illnesses. 😕")

                else:
                    print("Chatbot: Sorry, I can only identify physical illnesses. 😕")

        else:
            print("Chatbot: Please respond with 'yes' or 'no'.")

if __name__ == "__main__":
    chatbot()
