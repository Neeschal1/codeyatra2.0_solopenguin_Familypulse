from dotenv import load_dotenv
import os

class Config:
    STRIPE_PUBLISHABLE_KEY = os.getenv('PUBLISHABLE_KEY')
    STRIPE_SECRET_KEY = os.getenv('SECRET_KEY')
    
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')