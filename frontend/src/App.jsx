import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Search, 
  Bell, 
  LayoutDashboard, 
  Radar, 
  PieChart, 
  ChevronRight, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  User
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const mockChartData = [
  { name: '09:15', value: 24200 },
  { name: '10:00', value: 24250 },
  { name: '11:00', value: 24180 },
  { name: '12:00', value: 24320 },
  { name: '13:00', value: 24400 },
  { name: '14:00', value: 24350 },
  { name: '15:30', value: 24420 },
];

const BASE_URL = 'https://stocksense-ai-rreg.onrender.com';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketBrief, setMarketBrief] = useState("");
  const [niftyHistory, setNiftyHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [niftyStats, setNiftyStats] = useState({ price: "24,420.75", change: "+0.85%" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const healthRes = await axios.get(`${BASE_URL}/`);
        setIsOnline(healthRes.data.status === 'online');

        const scanRes = await axios.get(`${BASE_URL}/stocks/scan`);
        setStocks(scanRes.data);

        const briefRes = await axios.get(`${BASE_URL}/market/brief`);
        setMarketBrief(briefRes.data.briefing);

        const niftyRes = await axios.get(`${BASE_URL}/market/nifty`);
        setNiftyHistory(niftyRes.data);
        
        if (niftyRes.data.length > 0) {
          const lastPrice = niftyRes.data[niftyRes.data.length - 1].value;
          const firstPrice = niftyRes.data[0].value;
          const diff = lastPrice - firstPrice;
          const percent = ((diff / firstPrice) * 100).toFixed(2);
          setNiftyStats({
            price: lastPrice.toLocaleString('en-IN'),
            change: `${diff > 0 ? '+' : ''}${percent}%`
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-white font-sans">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-8 glass border-r border-white/10 z-50">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-12 glow-purple">
          <TrendingUp className="text-white" size={28} />
        </div>
        <nav className="flex flex-col gap-8">
          <LayoutDashboard className="text-primary cursor-pointer hover:text-white transition" />
          <Radar className="text-gray-400 cursor-pointer hover:text-primary transition" />
          <PieChart className="text-gray-400 cursor-pointer hover:text-primary transition" />
          <Bell className="text-gray-400 cursor-pointer hover:text-primary transition" />
        </nav>
        <div className="mt-auto">
          <User className="text-gray-400 cursor-pointer hover:text-white transition" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-28 pr-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-2">InvestMate <span className="gradient-text">AI</span></h1>
            <p className="text-gray-400">Market Intelligence for the Indian Retail Investor</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mr-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-secondary animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {isOnline ? 'Live' : 'Offline'}
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search stocks..." 
                className="bg-surface border border-white/10 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
              />
            </div>
            <button className="bg-primary hover:opacity-90 text-white px-6 py-2 rounded-full font-medium transition glow-purple">
              Get AI Deep Dive
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Market Briefing Card */}
          <div className="col-span-12 glass p-6 rounded-3xl border-l-4 border-l-secondary glow-teal mb-4">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-secondary" size={20} />
              <h2 className="text-lg font-semibold text-secondary">AI Morning Briefing</h2>
            </div>
            <p className="text-gray-200 leading-relaxed italic">
              "{marketBrief || "Nifty 50 looking strong today with positive global cues. Watch out for HDFC Bank and Reliance!"}"
            </p>
          </div>

          {/* Chart Section */}
          <div className="col-span-8 glass p-6 rounded-3xl relative overflow-hidden">
             <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold">NIFTY 50</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-mono">{niftyStats.price}</span>
                    <span className={`${niftyStats.change.startsWith('+') ? 'text-secondary' : 'text-red-400'} flex items-center text-sm`}>
                      {niftyStats.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} 
                      {niftyStats.change}
                    </span>
                  </div>
                </div>
                <div className="flex bg-surface rounded-lg p-1 border border-white/5">
                  <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-white/5">1D</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-primary/20 text-primary">1W</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-white/5">1M</button>
                </div>
             </div>
             
             <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={niftyHistory.length > 0 ? niftyHistory : mockChartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c026d3" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#c026d3" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '12px'}}
                      itemStyle={{color: '#c026d3'}}
                    />
                    <Area type="monotone" dataKey="value" stroke="#c026d3" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Opportunity Radar */}
          <div className="col-span-4 glass p-6 rounded-3xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Radar size={20} className="text-primary" />
                Signals
              </h3>
              <span className="text-xs text-gray-400">Real-time</span>
            </div>
            
            <div className="space-y-4 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
              {loading ? (
                <div className="flex justify-center py-10"><Zap className="animate-pulse text-primary" /></div>
              ) : !isOnline ? (
                <div className="text-center py-10 opacity-50 px-4">
                  <p className="text-sm">Unable to reach market server.</p>
                  <button onClick={() => window.location.reload()} className="text-xs text-primary underline mt-2">Retry Connection</button>
                </div>
              ) : (
                <AnimatePresence>
                  {stocks.map((stock, idx) => (
                    <motion.div 
                      key={stock.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition group hover:bg-white/[0.08] cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold">{stock.symbol}</h4>
                          <span className="text-xs text-gray-400">₹{stock.price}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          stock.signals?.[0]?.type?.includes('BREAKOUT') ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'
                        }`}>
                          {stock.signals?.[0]?.type || "SIGNAL"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mb-3 line-clamp-2 italic">
                        {stock.ai_insight}
                      </p>
                      <div className="flex items-center text-[10px] text-primary font-bold opacity-0 group-hover:opacity-100 transition">
                        VIEW ANALYTICS <ChevronRight size={10} />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            <button className="mt-auto w-full py-3 rounded-xl border border-dashed border-white/20 text-gray-400 text-sm hover:border-primary/50 hover:text-primary transition">
              + Add Watchlist Stock
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
}

export default App;
