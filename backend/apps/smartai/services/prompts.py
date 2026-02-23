from dotenv import load_dotenv
from .llm import google_llm

load_dotenv()

def summarize_report_prompt(report_context):
    """
    Generates a plain-language summary of a medical report.
    """
    prompt = f"""
You are a compassionate medical assistant.

Summarize the medical report below in plain, easy-to-understand language for patients or family members.
Include key findings, what they mean, and any notes from the doctor or nurse.

Medical Report:
{report_context}

Rules:
- Keep it simple, explain any medical terms
- Be honest and reassuring
- Focus only on the information given
- Do not invent facts or speculate
- End with: "This is a simplified summary—always consult your doctor for full advice."
"""
    return google_llm(prompt)