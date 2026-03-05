export default function PerformerCard({ performer, rank }) {
  const price = parseFloat(performer.lastPrice);
  const change = parseFloat(performer.priceChangePercent);
  const volume = parseFloat(performer.quoteVolume);
  const high = parseFloat(performer.highPrice);
  const low = parseFloat(performer.lowPrice);

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6 hover:border-green-400 dark:hover:border-green-700/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-bold
            ${rank <= 3 
              ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-black' 
              : 'bg-gray-200 dark:bg-zinc-900 text-gray-600 dark:text-gray-400'
            }
          `}>
            #{rank}
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 uppercase font-disket">
              {performer.symbol.replace('USDT', '')}
              <span className="text-xs text-gray-500 dark:text-gray-500 ml-1">/USDT</span>
            </h3>
          </div>
        </div>

        <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
          <span className="text-xs font-bold text-green-600 dark:text-green-500">24h Top</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-disket">
          ${price.toLocaleString(undefined, { 
            minimumFractionDigits: 2,
            maximumFractionDigits: price > 1 ? 2 : 6
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
          <span className="text-lg font-bold text-green-600 dark:text-green-500">
            ↑ +{change.toFixed(2)}%
          </span>
        </div>
        
        <div className="text-xs text-gray-600 dark:text-gray-500 font-disket">
          Vol: ${(volume / 1000000).toFixed(2)}M
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-600 mb-1">24h High</div>
          <div className="text-sm font-bold text-green-600 dark:text-green-400 font-disket">${high.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-600 mb-1">24h Low</div>
          <div className="text-sm font-bold text-gray-700 dark:text-gray-400 font-disket">${low.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-600 mb-1">Change</div>
          <div className="text-sm font-bold text-green-600 dark:text-green-400 font-disket">
            +${parseFloat(performer.priceChange).toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-600 mb-1">Trades</div>
          <div className="text-sm font-bold text-gray-700 dark:text-gray-400 font-disket">
            {parseInt(performer.count).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
