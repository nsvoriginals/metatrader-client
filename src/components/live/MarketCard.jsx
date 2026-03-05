// components/MarketCard.jsx
import { useState, useEffect } from 'react';

export default function MarketCard({ ticker, onClick }) {
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    if (!ticker) return;
    
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 300);
    return () => clearTimeout(timer);
  }, [ticker?.c]);

  if (!ticker) {
    return (
      <div className="bg-gray-50 dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6 animate-pulse transition-colors">
        <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-24 mb-4" />
        <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-32 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-16" />
      </div>
    );
  }

  const price = parseFloat(ticker.c);
  const changePercent = parseFloat(ticker.P);
  const isPositive = changePercent >= 0;
  const volume = parseFloat(ticker.v);
  const high24h = parseFloat(ticker.h);
  const low24h = parseFloat(ticker.l);

  return (
    <div 
      onClick={onClick}
      className={`
        relative rounded-lg border p-6 transition-all duration-200 cursor-pointer
        bg-white dark:bg-zinc-950
        ${isPositive 
          ? 'border-green-200 dark:border-green-900/30 hover:border-green-400 dark:hover:border-green-700/50' 
          : 'border-red-200 dark:border-red-900/30 hover:border-red-400 dark:hover:border-red-700/50'
        }
        hover:shadow-md
      `}
    >
    

      <div className="relative z-10">
        {/* Symbol */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wide font-disket">
            {ticker.s.replace('USDT', '')}
            <span className="text-xs text-gray-500 dark:text-gray-500 ml-1">/USDT</span>
          </h3>
          
          <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-disket">
            ${price.toLocaleString(undefined, { 
              minimumFractionDigits: 2,
              maximumFractionDigits: price > 1 ? 2 : 6
            })}
          </div>
        </div>

        {/* Change */}
        <div className="flex items-center justify-between mb-4">
          <div className={`
            flex items-center gap-2 px-3 py-1 rounded-full
            ${isPositive 
              ? 'bg-green-500/10 border border-green-500/30' 
              : 'bg-red-500/10 border border-red-500/30'
            }
          `}>
            <span className={`text-sm font-bold font-disket ${
              isPositive 
                ? 'text-green-600 dark:text-green-500' 
                : 'text-red-600 dark:text-red-500'
            }`}>
              {isPositive ? '↑' : '↓'} {Math.abs(changePercent).toFixed(2)}%
            </span>
          </div>
          
          <div className="text-xs text-gray-600 dark:text-gray-500 font-disket">
            Vol: {(volume / 1000000).toFixed(2)}M
          </div>
        </div>

        {/* 24h Range */}
        <div className="pt-4 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-500 dark:text-gray-600">Low: </span>
              <span className="font-disket text-gray-700 dark:text-gray-400">${low24h.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-600">High: </span>
              <span className="font-disket text-gray-700 dark:text-gray-400">${high24h.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
