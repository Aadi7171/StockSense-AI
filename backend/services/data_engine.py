import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

class DataEngine:
    def __init__(self):
        pass

    def get_stock_data(self, symbol: str, period: str = "1mo", interval: str = "1d"):
        """
        Fetch stock data from Yahoo Finance.
        For NSE stocks, the symbol should be like 'RELIANCE.NS'.
        """
        if not symbol.endswith(".NS"):
            ticker_sym = f"{symbol}.NS"
        else:
            ticker_sym = symbol
            
        try:
            ticker = yf.Ticker(ticker_sym)
            df = ticker.history(period=period, interval=interval)
            
            if df.empty:
                return None
                
            return df
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")
            return None

    def get_nifty_history(self, period: str = "7d", interval: str = "1h"):
        """
        Fetch historical data for the Nifty 50 Index (^NSEI).
        """
        try:
            ticker = yf.Ticker("^NSEI")
            df = ticker.history(period=period, interval=interval)
            
            if df.empty:
                return []
            
            # Format for Recharts
            history = []
            for index, row in df.iterrows():
                history.append({
                    "time": index.strftime("%H:%M") if period == "1d" else index.strftime("%d %b"),
                    "value": round(row['Close'], 2)
                })
            return history
        except Exception as e:
            print(f"Error fetching Nifty history: {e}")
            return []

    def get_nifty50_symbols(self):
        """
        Returns a hardcoded list of major Nifty 50 symbols for the demo.
        In a real app, this should be fetched from NSE.
        """
        return [
            "RELIANCE", "TCS", "HDFCBANK", "ICICIBANK", "INFY",
            "HINDUNILVR", "ITC", "SBIN", "BHARTIARTL", "KOTAKBANK",
            "LT", "AXISBANK", "ASIANPAINT", "MARUTI", "SUNPHARMA"
        ]
