// components/CryptoDashboard.tsx
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  Area, AreaChart
} from 'recharts';
import { Bell, Download, MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';

const CryptoDashboard = () => {
  // Sample data for charts
  const priceData = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    price: 7000 + Math.random() * 1500,
  }));

  const heatmapData = Array.from({ length: 7 }, (row) => 
    Array.from({ length: 60 }, () => Math.random())
  );

  const volumeData = [
    { month: 'Sep', txns: 45447, vol: 150, fees: 2.1, buy: 15256 },
    { month: 'Dec', txns: 45447, vol: 150, fees: 2.1, buy: 15256 },
    { month: 'Nov', txns: 45447, vol: 150, fees: 2.1, buy: 15256 },
    { month: 'Oct', txns: 45447, vol: 150, fees: 2.1, buy: 15256 },
    { month: 'Aug', txns: 45447, vol: 150, fees: 2.1, buy: 15256 },
  ];

  const longShortData = Array.from({ length: 50 }, (_, i) => ({
    date: i,
    ratio: 0.5 + Math.random() * 0.7,
  }));

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-mono">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="text-2xl">❄️</div>
            <span className="text-xl font-bold">Numora</span>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <input 
              type="text" 
              placeholder="Search any token"
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-4 py-2 text-sm"
            />
          </div>

          <nav className="flex gap-6 text-sm text-neutral-400">
            <a href="#" className="hover:text-white">AI Signals</a>
            <a href="#" className="hover:text-white">Stake</a>
            <a href="#" className="hover:text-white">Portfolio</a>
            <a href="#" className="hover:text-white">Smart Alerts</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded" />
            <span className="text-sm">hollan</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Token Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-xl">◇</span>
          </div>
          <span className="text-lg font-bold">SUI</span>
          <span className="text-neutral-500 text-sm">Decimal</span>
          
          <div className="flex gap-2 ml-auto">
            <button className="px-3 py-1 bg-neutral-900 border border-neutral-700 rounded text-xs">1D</button>
            <button className="px-3 py-1 bg-neutral-900 border border-neutral-700 rounded text-xs">7D</button>
            <button className="px-3 py-1 bg-white text-black rounded text-xs">3H</button>
            <button className="px-3 py-1 bg-neutral-900 border border-neutral-700 rounded text-xs">1Y</button>
            <button className="px-3 py-1 bg-neutral-900 border border-neutral-700 rounded text-xs">All</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="col-span-2 space-y-6">
            {/* Price Chart */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={priceData}>
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Line type="monotone" dataKey="price" stroke="#fff" strokeWidth={1} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Transaction Heatmap */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              
              
              
              <div className="flex justify-between mt-2 text-xs text-neutral-500">
                <span>Sep</span>
                <span>Dec</span>
                <span>Nov</span>
                <span>Oct</span>
                <span>Aug</span>
                <span>Jul</span>
              </div>
            </div>

            {/* Holders & Volume */}
            <div className="grid grid-cols-2 gap-6">
              {/* Holders */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-4">Holders</h3>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="text-3xl font-bold mb-1">20%</div>
                    <div className="text-xs text-neutral-500">Cruisers</div>
                    <div className="text-xs text-neutral-600">Whales 96.37%</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-3xl font-bold mb-1">75%</div>
                    <div className="text-xs text-neutral-500">Holders</div>
                    <div className="text-xs text-neutral-600">Others 1.53%</div>
                  </div>
                  
                  <div className="flex-1 opacity-50">
                    <div className="text-3xl font-bold mb-1">5%</div>
                    <div className="text-xs text-neutral-500">Traders</div>
                  </div>
                </div>
              </div>

              {/* Buys/Sells Volume */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Buys/Sells Volume</h3>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 bg-neutral-800 rounded text-xs">1D</button>
                    <button className="px-2 py-1 bg-neutral-800 rounded text-xs">7D</button>
                    <button className="px-2 py-1 bg-white text-black rounded text-xs">3H</button>
                    <button className="px-2 py-1 bg-neutral-800 rounded text-xs">1Y</button>
                    <button className="px-2 py-1 bg-neutral-800 rounded text-xs">All</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4 text-xs">
                  <div>
                    <div className="text-neutral-500">Txns</div>
                    <div className="font-bold">45,447</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Vol</div>
                    <div className="font-bold">150M$</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Chain Fees</div>
                    <div className="font-bold">2.1M$</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Net Buy</div>
                    <div className="font-bold text-green-500">+15,256$</div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={volumeData}>
                    <XAxis dataKey="month" stroke="#666" />
                    <Bar dataKey="vol" fill="#fff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Long/Short Ratio */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Long/Short Ratio</h3>
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-neutral-800 rounded text-xs">24H</button>
                  <button className="px-2 py-1 bg-neutral-800 rounded text-xs">1D</button>
                  <button className="px-2 py-1 bg-white text-black rounded text-xs">7D</button>
                  <button className="px-2 py-1 bg-neutral-800 rounded text-xs">All</button>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={longShortData}>
                  <defs>
                    <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#666" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#666" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Area type="monotone" dataKey="ratio" stroke="#999" fillOpacity={1} fill="url(#colorRatio)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Portfolio Stats */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Portfolio</h3>
                <button className="flex items-center gap-1 text-xs">
                  <span>Buy SUI</span>
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-neutral-500">Today</div>
                  <div className="text-2xl font-bold">3,585$</div>
                  <div className="text-xs text-red-500 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -35.56%
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-neutral-500">Month</div>
                  <div className="text-xl font-bold">12,005$</div>
                  <div className="text-xs text-red-500 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -5.92%
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-neutral-500">Year</div>
                  <div className="text-xl font-bold">125,000$</div>
                  <div className="text-xs text-green-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8.15%
                  </div>
                </div>
              </div>

              {/* Activity Heatmap */}
              <div className="mt-4 grid grid-cols-12 gap-1">
                {Array.from({ length: 365 }).map((_, idx) => (
                  <div 
                    key={idx}
                    className="aspect-square rounded-sm bg-neutral-800"
                    style={{ 
                      opacity: Math.random() 
                    }}
                  />
                ))}
              </div>
              
              <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                <div className="flex gap-2">
                  <span className="text-green-400">● USDT 35%</span>
                  <span className="text-blue-400">● ETH 22.5%</span>
                </div>
              </div>
              <div className="text-xs text-neutral-500">
                <span className="text-purple-400">● SUI 30.9%</span>
                <span className="ml-2 text-orange-400">● UNI 10.2%</span>
              </div>
            </div>

            {/* Unlocks */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-4">Unlocks</h3>
              
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#333" strokeWidth="12" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="#fff" strokeWidth="12" fill="none"
                      strokeDasharray={`${2 * Math.PI * 56 * 0.34} ${2 * Math.PI * 56}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">34%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">● Total Locked</span>
                  <span>13.05%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">● TBD locked</span>
                  <span>52.17%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">● Unlocked</span>
                  <span>33.90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">● Unreleased</span>
                  <span>0.02%</span>
                </div>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">🤖 AI Assistant</h3>
                <MoreVertical className="w-4 h-4" />
              </div>
              
              <div className="space-y-3">
                <div className="bg-neutral-800 rounded p-3 text-xs">
                  <div className="text-neutral-400 mb-1">15:01</div>
                  Give me a forecast for the SUI coin
                </div>
                
                <div className="bg-neutral-800 rounded p-3 text-xs">
                  <div className="text-neutral-400 mb-1">15:01</div>
                  <div className="leading-relaxed">
                    Sure! SUI is currently trading at $7.55, with a 24h change of +2.8%. 
                    Based on recent trends and volume inflows, short-term momentum appears bullish
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter a message..."
                  className="flex-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-xs"
                />
                <button className="bg-white text-black px-4 rounded">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDashboard;
