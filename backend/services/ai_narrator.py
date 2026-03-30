import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class AINarrator:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel("gemini-1.5-flash")
        else:
            self.model = None

    def explain_signal(self, symbol: str, signal: dict):
        """
        Takes technical signals and explains them in plain English.
        """
        prompt = f"""
        You are a financial analyst at ET Markets. 
        Explain the following technical signal for stock {symbol} to a retail investor.
        Signal Type: {signal.get('type')}
        Technical Details: {signal.get('description')}
        Keep it concise, high-impact, and jargon-free. Provide a potential action or caution.
        """
        
        if not self.model:
            return f"Mock AI Insight: {symbol} shows a {signal.get('type')}. This is often a sign of market movement. (Please provide a Gemini API Key for real insights)."
            
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"Error generating AI insight: {e}"

    def get_market_briefing(self, nifty_status: str):
        """
        Generates a 30-second market briefing.
        """
        prompt = f"""
        Generate a 30-second morning brief for the Indian market.
        Nifty Trend: {nifty_status}
        Focus on the sentiment of the Indian investor.
        Make it sound professional yet exciting.
        """
        
        if not self.model:
            return "Mock Brief: Nifty 50 looking strong today with positive global cues. Watch out for HDFC Bank and Reliance!"
            
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"Error generating market brief: {e}"
