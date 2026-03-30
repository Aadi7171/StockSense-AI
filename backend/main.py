from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.data_engine import DataEngine
from services.pattern_engine import PatternEngine
from services.ai_narrator import AINarrator
import uvicorn

app = FastAPI(title="InvestMate AI Backend")

# Enable CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

data_engine = DataEngine()
pattern_engine = PatternEngine()
ai_narrator = AINarrator()

@app.get("/")
def read_root():
    return {"status": "online", "message": "InvestMate AI Backend is Live!"}

@app.get("/market/nifty")
def get_nifty_data():
    """
    Returns historical data for the Nifty 50 index.
    """
    return data_engine.get_nifty_history()

@app.get("/stocks/scan")
def scan_stocks():
    """
    Scans Nifty 50 stocks for patterns and returns signals + AI insights.
    """
    symbols = data_engine.get_nifty50_symbols()
    results = []
    
    for sym in symbols[:10]: # Limiting for demo speed
        df = data_engine.get_stock_data(sym)
        if df is not None:
            signals = pattern_engine.detect_signals(df)
            if signals:
                # Add AI insight for the first signal found
                insight = ai_narrator.explain_signal(sym, signals[0])
                results.append({
                    "symbol": sym,
                    "price": round(df['Close'].iloc[-1], 2),
                    "signals": signals,
                    "ai_insight": insight
                })
                
    return results

@app.get("/market/brief")
def market_brief():
    """
    Returns a global market briefing.
    """
    return {"briefing": ai_narrator.get_market_briefing("Cautiously Optimistic")}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
