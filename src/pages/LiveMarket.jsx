import MarketCard from "@/components/live/MarketCard";
import { useMultipleTickers } from "./useMultiple";

const CRYPTO_SYMBOLS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "XRPUSDT",
  "SOLUSDT",
  "ADAUSDT",
  "AVAXUSDT",
  "DOGEUSDT",
  "TRXUSDT",
  "LINKUSDT",
  "UNIUSDT",
  "DOTUSDT",
];

export default function MarketPage({ onSymbolSelect }) {
  const tickers = useMultipleTickers(CRYPTO_SYMBOLS);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <main className="p-6 max-w-[1800px] mx-auto">
      
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-2 font-disket">
            Live Markets
          </h2>
          <p className="text-gray-600 dark:text-zinc-500">
            Real-time cryptocurrency prices • {CRYPTO_SYMBOLS.length} pairs
          </p>
        </div>

  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CRYPTO_SYMBOLS.map(symbol => (
            <MarketCard 
              key={symbol} 
              ticker={tickers[symbol]}
              onClick={() => onSymbolSelect(symbol)}
            />
          ))}
        </div>

        <div className="mt-8 bg-gray-50 dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6 transition-colors">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mb-1 font-disket">
                {CRYPTO_SYMBOLS.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-500">Markets</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-500 mb-1 font-disket">
                {Object.values(tickers).filter(t => parseFloat(t?.P || 0) > 0).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-500">Gainers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-500 mb-1 font-disket">
                {Object.values(tickers).filter(t => parseFloat(t?.P || 0) < 0).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-500">Losers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-1 font-disket">
                {Object.keys(tickers).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-500">Connected</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
