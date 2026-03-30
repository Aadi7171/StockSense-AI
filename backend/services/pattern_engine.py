import pandas as pd
import numpy as np

class PatternEngine:
    def __init__(self):
        pass

    def calculate_rsi(self, data: pd.Series, window: int = 14):
        """
        Standard Relative Strength Index calculation.
        """
        delta = data.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
        
        rs = gain / loss
        return 100 - (100 / (1 + rs))

    def detect_signals(self, df: pd.DataFrame):
        """
        Detects technical signals like RSI oversold/overbought and basic breakouts.
        """
        if df is None or len(df) < 20:
            return []
            
        signals = []
        
        # Latest data
        latest = df.iloc[-1]
        previous = df.iloc[-2]
        
        # RSI Calculation
        df['RSI'] = self.calculate_rsi(df['Close'])
        current_rsi = df['RSI'].iloc[-1]
        
        # 1. RSI Overbought/Oversold
        if current_rsi < 30:
            signals.append({
                "type": "RSI_OVERSOLD",
                "confidence": 0.8,
                "description": f"RSI is {current_rsi:.2f}. Potential reversal from oversold zone."
            })
        elif current_rsi > 70:
            signals.append({
                "type": "RSI_OVERBOUGHT",
                "confidence": 0.7,
                "description": f"RSI is {current_rsi:.2f}. Caution: Stock may be overextended."
            })
            
        # 2. Simple Breakout (Current Close > Max(Previous 20 days))
        recent_high = df['Close'].iloc[-21:-1].max()
        if latest['Close'] > recent_high:
            signals.append({
                "type": "BREAKOUT",
                "confidence": 0.85,
                "description": f"Stock broke above its 20-day high of {recent_high:.2f}."
            })
            
        return signals
