import { useTicker } from "../market/useLiveTicket";

export default function StockHeader({ symbol }) {
  const t = useTicker(symbol);
  
  if (!t) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-800 transition-colors">
        <div className="text-gray-600 dark:text-zinc-500 font-disket">Loading...</div>
      </div>
    );
  }

  const priceChange = parseFloat(t.p);
  const priceChangePercent = parseFloat(t.P);
  const isPositive = priceChange >= 0;

  return (
    <div className="p-6 bg-gray-50 dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-800 mb-4 transition-colors">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-baseline gap-4">
          <h1 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 m-0 tracking-wide font-disket">
            {symbol}
          </h1>
          
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md border ${
            isPositive 
              ? 'bg-yellow-500/10 border-yellow-500/30 dark:bg-yellow-400/10 dark:border-yellow-400/30' 
              : 'bg-gray-500/10 border-gray-500/30 dark:bg-zinc-500/10 dark:border-zinc-500/30'
          }`}>
            <span className={`text-sm font-semibold ${
              isPositive ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-400'
            }`}>
              {isPositive ? '↑' : '↓'} {Math.abs(priceChangePercent).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-600 dark:text-zinc-500 text-right">
          24h Change
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-600 dark:text-zinc-500 mb-2 uppercase tracking-wider font-medium">
          Current Price
        </div>
        <div className="text-5xl font-bold text-gray-900 dark:text-gray-200 font-disket leading-none">
          {parseFloat(t.c).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className={`text-lg mt-2 font-semibold ${
          isPositive ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-400'
        }`}>
          {isPositive ? '+' : ''}{parseFloat(t.p).toFixed(2)} USD
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-zinc-900 rounded-md border border-gray-200 dark:border-zinc-800">
          <div className="text-xs text-gray-600 dark:text-zinc-500 mb-2 font-medium">
            24h High
          </div>
          <div className="text-xl text-yellow-600 dark:text-yellow-400 font-bold font-disket">
            {parseFloat(t.h).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 rounded-md border border-gray-200 dark:border-zinc-800">
          <div className="text-xs text-gray-600 dark:text-zinc-500 mb-2 font-medium">
            24h Low
          </div>
          <div className="text-xl text-gray-700 dark:text-gray-400 font-bold font-disket">
            {parseFloat(t.l).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 rounded-md border border-gray-200 dark:border-zinc-800">
          <div className="text-xs text-gray-600 dark:text-zinc-500 mb-2 font-medium">
            24h Volume
          </div>
          <div className="text-xl text-gray-900 dark:text-gray-200 font-bold font-disket">
            {parseFloat(t.v).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 rounded-md border border-gray-200 dark:border-zinc-800">
          <div className="text-xs text-gray-600 dark:text-zinc-500 mb-2 font-medium">
            Trades
          </div>
          <div className="text-xl text-gray-900 dark:text-gray-200 font-bold font-disket">
            {parseInt(t.n || 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
