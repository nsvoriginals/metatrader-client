import { useAggTrades } from "../market/useAggLines";
import { useEffect, useState } from "react";

export function BuySellStats({ symbol }) {
  const { buy, sell, status } = useAggTrades(symbol);
  const [animated, setAnimated] = useState(false);
  
  const total = buy + sell;
  const buyPercentage = total > 0 ? (buy / total) * 100 : 50;
  const sellPercentage = total > 0 ? (sell / total) * 100 : 50;

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, []);

  const isBullish = buyPercentage > sellPercentage;

  if (status === 'connecting' || status === 'disconnected') {
    return (
      <div className="p-12 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 transition-colors">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-zinc-500 font-disket">Connecting to order flow...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-12 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 transition-colors">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-500 font-disket mb-2">Connection Error</p>
            <p className="text-gray-600 dark:text-zinc-600 text-sm">Unable to connect to order flow stream</p>
          </div>
        </div>
      </div>
    );
  }

  if (total === 0 && status === 'connected') {
    return (
      <div className="p-12 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 transition-colors">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-disket">Order Flow</h3>
          <div className="px-5 py-2 rounded-full text-sm font-bold font-disket bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30">
            CONNECTED
          </div>
        </div>
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-zinc-500 font-disket">Waiting for trades...</p>
          <div className="mt-4 flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 transition-colors">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-disket">
          Order Flow
        </h3>
        <div className={`px-5 py-2 rounded-full text-sm font-bold font-disket ${
          isBullish 
            ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30' 
            : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30'
        }`}>
          {isBullish ? 'BULLISH' : 'BEARISH'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16 mb-10">
        <div className="text-center">
          <div className="text-gray-600 dark:text-zinc-500 text-sm mb-3 uppercase tracking-wider">Buy Pressure</div>
          <div className="text-6xl font-bold text-green-600 dark:text-green-500 mb-2 font-disket">
            {buy.toLocaleString()}
          </div>
          <div className="text-gray-600 dark:text-zinc-600 text-lg font-disket">{buyPercentage.toFixed(1)}%</div>
        </div>

        <div className="text-center">
          <div className="text-gray-600 dark:text-zinc-500 text-sm mb-3 uppercase tracking-wider">Sell Pressure</div>
          <div className="text-6xl font-bold text-red-600 dark:text-red-500 mb-2 font-disket">
            {sell.toLocaleString()}
          </div>
          <div className="text-gray-600 dark:text-zinc-600 text-lg font-disket">{sellPercentage.toFixed(1)}%</div>
        </div>
      </div>

      <div className="relative h-20 bg-gray-200 dark:bg-black rounded-xl overflow-hidden border border-gray-300 dark:border-zinc-800">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-600 to-green-500 transition-all duration-1000 ease-out"
          style={{ width: animated ? `${buyPercentage}%` : '0%' }}
        />
        
        <div 
          className="absolute right-0 top-0 h-full bg-gradient-to-l from-red-600 to-red-500 transition-all duration-1000 ease-out"
          style={{ width: animated ? `${sellPercentage}%` : '0%' }}
        />

        <div className="absolute inset-0 flex items-center justify-between px-6 text-white font-bold text-lg font-disket z-10">
          {buyPercentage > 20 && <span>{buyPercentage.toFixed(0)}%</span>}
          {sellPercentage > 20 && <span>{sellPercentage.toFixed(0)}%</span>}
        </div>
      </div>

      <div className="mt-6 text-center">
        <span className="text-gray-600 dark:text-zinc-600 text-sm">Total: </span>
        <span className="text-gray-900 dark:text-white font-bold text-lg font-disket">
          {total.toLocaleString()}
        </span>
        <span className="ml-4 text-gray-600 dark:text-zinc-600 text-xs">
          Live • {status}
        </span>
      </div>
    </div>
  );
}
