from langchain.chat_models import init_chat_model
import os
from dotenv import load_dotenv

load_dotenv()

google_api_key = os.getenv('GOOGLE_API_KEY')
google_model_name = os.getenv('GOOGLE_MODEL_NAME')
google_model_provider = os.getenv('GOOGLE_MODEL_PROVIDER')

def google_llm(prompt: str) -> str:
    model = init_chat_model(
        api_key=google_api_key,
        model=google_model_name,
        model_provider=google_model_provider
    )
    return model.invoke(prompt).content