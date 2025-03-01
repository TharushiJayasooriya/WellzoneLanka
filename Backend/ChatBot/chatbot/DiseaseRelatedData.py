import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

# Download necessary NLTK resources
nltk.download('punkt')

# Initialize the stemmer
stemmer = PorterStemmer()

# Dictionary containing physical diseases and their synonyms
PHYSICAL_DISEASE_SYNONYMS = {
    "back pain": ["back", "lower back", "spine", "lumbar", "stiff back", "aching back"],
    "neck pain": ["neck", "cervical", "stiff neck", "sore neck", "neck stiffness"],
    "shoulder pain": ["shoulder", "frozen shoulder", "rotator cuff", "aching shoulder"],
    "knee pain": ["knee", "joint", "arthritis", "swollen knee", "patella"],
    "joint pain": ["joint", "arthritis", "swollen", "aching joints", "stiffness"],
    "muscle pain": ["muscle", "sore muscles", "myalgia", "body pain"],
    "sciatica": ["sciatica", "nerve", "lower limb", "shooting pain", "leg numbness"],
    "tendonitis": ["tendonitis", "inflamed tendons", "tendon", "overuse injury"],
    "carpal tunnel syndrome": ["carpal", "wrist", "numb fingers", "tingling hands", "RSI"],
    "fibromyalgia": ["fibromyalgia", "chronic", "widespread pain", "fatigue"],
    "herniated disc": ["herniated", "slipped", "bulging disc", "spinal disc", "pinched nerve"],
    "osteoarthritis": ["osteoarthritis", "degenerative joint", "cartilage", "knee arthritis"],
    "rheumatoid arthritis": ["rheumatoid", "autoimmune", "chronic joint", "inflammation"],
    "tennis elbow": ["elbow", "tennis elbow", "forearm pain", "elbow pain", "golfer's elbow"],
    "ankle sprain": ["ankle", "twisted ankle", "swollen foot", "pain in ankle"],
    "plantar fasciitis": ["plantar", "heel", "foot arch", "sole pain"]
}

# Function to find disease based on user input (with improved stemming & matching)
def find_physical_disease(user_input):
    user_input = user_input.lower()
    user_tokens = {stemmer.stem(word) for word in word_tokenize(user_input)}  # Stem user input words

    for disease, synonyms in PHYSICAL_DISEASE_SYNONYMS.items():
        disease_tokens = {stemmer.stem(word) for word in synonyms}  # Stem synonym words
        
        # Check if at least one synonym matches user input
        if user_tokens & disease_tokens:  # Intersection method
            return disease

    return None
