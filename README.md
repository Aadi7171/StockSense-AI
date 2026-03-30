# InvestMate AI 📈

**InvestMate AI** is a professional-grade market intelligence dashboard designed specifically for the Indian retail investor. It combines real-time technical analysis with Large Language Models (LLMs) to provide clear, actionable insights for Nifty 50 stocks.

![Dashboard Preview](https://img.shields.io/badge/UI-Premium-blueviolet)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-4285F4)

## ✨ Key Features

- **Live Market Radar**: Scans Nifty 50 stocks in real-time for technical patterns like Breakouts and RSI Overbought/Oversold levels.
- **AI-Powered Narration**: Uses Google Gemini to translate complex technical signals into plain English for retail investors.
- **Dynamic Charting**: Visualize Nifty 50 performance with interactive Area Charts.
- **Market Briefing**: AI-generated morning briefings to get you up to speed in 30 seconds.
- **Premium UI**: Dark-themed, glassmorphic design built with React, Tailwind CSS, and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React, Recharts, Framer Motion.
- **Backend**: FastAPI, Uvicorn, Python.
- **Data Engine**: Yahoo Finance API (yfinance).
- **AI Intelligence**: Google Gemini 1.5 Flash.

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.10+
- Node.js 18+

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
*Create a `.env` file in the `backend` folder and add your Gemini API Key:*
```env
GEMINI_API_KEY=your_api_key_here
```
*Run the server:*
```bash
python main.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📸 Screenshots

*(Add your screenshots here)*

---

**Developed for Portfolio Showcase** — Focused on bridging the gap between complex market data and retail investor accessibility.
