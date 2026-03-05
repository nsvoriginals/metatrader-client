export default function PerformersHero({ performers, avgGain, totalVolume }) {
  return (
    <div className="bg-gradient-to-b from-green-100 to-white dark:from-green-950/20 dark:to-black border-b border-gray-200 dark:border-zinc-900 px-6 py-12 transition-colors">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 font-disket">
              ⚡ Top Performers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              24-hour top gaining cryptocurrencies on Binance
            </p>
          </div>

          <div className="flex gap-6">
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-500 mb-1">Tracking</div>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 font-disket">
                {performers.length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-600">coins</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-500 mb-1">Avg Gain</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-500 font-disket">
                +{avgGain}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-600">24h change</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-500 mb-1">Volume</div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-300 font-disket">
                ${(totalVolume / 1000000000).toFixed(2)}B
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-600">24h total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
