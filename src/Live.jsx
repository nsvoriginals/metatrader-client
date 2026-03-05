import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Bell, Globe, ChevronDown, Settings, Copy, RefreshCw, Info } from 'lucide-react';

const TradingPlatform = () => {
  const [activeTab, setActiveTab] = useState('1H');
  const [swapType, setSwapType] = useState('Market');

  const tickerData = [
    { symbol: 'ZRX', price: '0.345', change: '(19%)', trend: 'up' },
    { symbol: 'LINA', price: '0.01425', change: '(38%)', trend: 'up' },
    { symbol: 'FLOKI', price: '< $0.0001', change: '(0%)', trend: 'down' },
    { symbol: 'WOO', price: '< $0.32', change: '(7%)', trend: 'up' },
  ];

  const tradeHistory = [
    { id: '0x1fa9...ffd960', type: 'BUY', amount: '$27,998', token: 'NotShibaxEthereum', busd: '1', usdt: 'USDT', wallet: '0x7f94...b996644', time: '744.1hr ago' },
    { id: '0x1fa9...ffd960', type: 'SELL', amount: '$365,523', token: 'NotShibaxEthereum', busd: '22', usdt: 'DOGE', wallet: '0x 92.506473', time: '108.2hr ago' },
    { id: '0x1fa9...ffd960', type: 'BUY', amount: '$767,821', token: 'NotShibaxEthereum', busd: '22', usdt: 'XRP', wallet: '1.03x52.94e036143', time: '98.9hr ago' },
    { id: '0x1fa9...ffd960', type: 'SELL', amount: '$135,123', token: 'NotShibaxEthereum', busd: '1', usdt: 'BUSD', wallet: '0x 27290.7b637731', time: '204.1hr ago' },
    { id: '0x1fa9...ffd960', type: 'BUY', amount: '$141,407', token: 'NotShibaxEthereum', busd: '13', usdt: 'DOGE', wallet: '01x3e5b7316', time: '17.5hr ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1 h-96 bg-gradient-to-b from-emerald-500/50 to-transparent transform -rotate-45 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-1 h-64 bg-gradient-to-b from-emerald-400/40 to-transparent transform -rotate-45 animate-pulse delay-75"></div>
        <div className="absolute bottom-0 right-0 w-1 h-96 bg-gradient-to-t from-emerald-500/50 to-transparent transform rotate-45 animate-pulse delay-150"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TRADERLY</span>
              </div>
              <nav className="flex space-x-1">
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium">Swap</button>
                <button className="px-4 py-2 text-gray-300 hover:text-white transition">Liquidity</button>
                <button className="px-4 py-2 text-gray-300 hover:text-white transition">Discover</button>
                <button className="px-4 py-2 text-gray-300 hover:text-white transition">About</button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Ethereum</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium">CONNECT WALLET</button>
              <button className="p-2 bg-gray-800 rounded-lg border border-gray-700">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-800 rounded-lg border border-gray-700">
                <Globe className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center space-x-8">
              <span className="text-sm text-gray-400 flex items-center">
                Trending Stats <TrendingUp className="w-4 h-4 ml-1" />
              </span>
              {tickerData.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{item.symbol}</span>
                  <span className="text-sm">{item.price}</span>
                  <span className={`text-xs ${item.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {item.change}
                  </span>
                  {item.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
              ))}
              <span className="text-sm text-emerald-400 cursor-pointer">Discover more</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Swap Panel */}
          <div className="col-span-3 space-y-4">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400">Swap for</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSwapType('Market')}
                    className={`px-3 py-1 text-xs rounded ${swapType === 'Market' ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                  >
                    Market
                  </button>
                  <button
                    onClick={() => setSwapType('Limit')}
                    className={`px-3 py-1 text-xs rounded ${swapType === 'Limit' ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400'}`}
                  >
                    Limit
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="text-xs text-gray-400 mb-2">You're not using Trader Lashback at the best price</div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Try typing "I'll $0 ETH to BTC"</span>
                    <span className="text-xs text-emerald-400">HIDE</span>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">From</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value="1861.700993"
                      className="bg-transparent text-2xl font-bold w-full outline-none"
                      readOnly
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="flex items-center space-x-2 bg-gray-900 px-3 py-2 rounded-lg">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full"></div>
                      <span className="font-medium">ETH</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-2">
                  <button className="bg-gray-800 p-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">To</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="0"
                      className="bg-transparent text-2xl font-bold w-full outline-none"
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="flex items-center space-x-2 bg-gray-900 px-3 py-2 rounded-lg">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full"></div>
                      <span className="font-medium">USDT</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-emerald-400 flex items-center">
                    <span>1 ETH = 1863.1 USDT</span>
                    <RefreshCw className="w-3 h-3 ml-1" />
                  </div>
                </div>

                <div className="text-xs text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Slippage Tolerance</span>
                    <span className="text-white">0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gas Fee <Info className="w-3 h-3 inline" /></span>
                    <span className="text-white">$16.56</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Saved <Info className="w-3 h-3 inline" /></span>
                    <span className="text-white">$8.92</span>
                  </div>
                </div>

                <button className="w-full bg-emerald-500 text-white py-4 rounded-lg font-bold hover:bg-emerald-600 transition">
                  Connect Wallet
                </button>

                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="text-sm font-medium mb-2">MORE INFORMATION</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Expected Execution <Info className="w-3 h-3 inline" /></span>
                      <span>ASAP NOW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gas Fee <Info className="w-3 h-3 inline" /></span>
                      <span>$16.56</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Saved <Info className="w-3 h-3 inline" /></span>
                      <span>$8.92</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition">
                  CONNECT WALLET
                </button>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="col-span-9 space-y-6">
            {/* Price Display */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full"></div>
                      <span className="text-xl font-bold">ETH / USDT</span>
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-1">1859.07 USDT</div>
                  <div className="text-emerald-400 text-sm">
                    $1,859.00 (+3.43%)
                    <span className="text-gray-400 ml-2">Today +3 hours</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {['1H', '4H', '1D', '1W', '1M', '6M'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 text-sm rounded ${
                        activeTab === tab ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="mt-6 h-64 relative">
                <svg width="100%" height="100%" className="overflow-visible">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 50}
                      x2="100%"
                      y2={i * 50}
                      stroke="#374151"
                      strokeWidth="1"
                      opacity="0.2"
                    />
                  ))}
                  {/* Chart line */}
                  <path
                    d="M 0,180 L 50,150 L 100,120 L 150,100 L 200,90 L 250,85 L 300,95 L 350,110 L 400,100 L 450,90 L 500,95 L 550,85 L 600,75 L 650,80 L 700,70 L 750,85 L 800,90 L 850,80 L 900,85 L 950,90 L 1000,95"
                    fill="url(#chartGradient)"
                    strokeWidth="0"
                  />
                  <path
                    d="M 0,180 L 50,150 L 100,120 L 150,100 L 200,90 L 250,85 L 300,95 L 350,110 L 400,100 L 450,90 L 500,95 L 550,85 L 600,75 L 650,80 L 700,70 L 750,85 L 800,90 L 850,80 L 900,85 L 950,90 L 1000,95"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                </svg>
                {/* Time labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
                  <span>5:58 PM</span>
                  <span>10:10 PM</span>
                  <span>2:23 AM</span>
                  <span>6:35 AM</span>
                  <span>10:47 AM</span>
                  <span>3:00 PM</span>
                </div>
              </div>
            </div>

            {/* Trade History */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold">Your trade history</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 text-gray-400 font-medium">Account</th>
                      <th className="text-left py-3 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 text-gray-400 font-medium">Token</th>
                      <th className="text-left py-3 text-gray-400 font-medium">Ordered</th>
                      <th className="text-left py-3 text-gray-400 font-medium">Price/token</th>
                      <th className="text-left py-3 text-gray-400 font-medium">BUSD</th>
                      <th className="text-left py-3 text-gray-400 font-medium">Transaction</th>
                      <th className="text-left py-3 text-gray-400 font-medium">Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeHistory.map((trade, idx) => (
                      <tr key={idx} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                        <td className="py-4 text-emerald-400">{trade.id}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            trade.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {trade.type}
                          </span>
                        </td>
                        <td className="py-4">{trade.amount}</td>
                        <td className="py-4 text-blue-400">{trade.token}</td>
                        <td className="py-4">{trade.busd}</td>
                        <td className="py-4">{trade.usdt}</td>
                        <td className="py-4">{trade.wallet}</td>
                        <td className="py-4 text-gray-400">{trade.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              2023 © <span className="text-emerald-400">tkinter.com</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition">Affiliate</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Regulations</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">FAQ</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Docs</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contacts</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Copy className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TradingPlatform;