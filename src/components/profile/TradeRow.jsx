export default function TradeRow({ trade }) {
  const isBuy = trade.side === 'BUY';
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="grid grid-cols-8 gap-4 items-center py-4 border-b border-gray-200 dark:border-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-900/30 transition-colors">
      
      <div className="col-span-1">
        <div className="text-gray-900 dark:text-white font-bold text-lg font-disket">
          {trade.symbol.replace('USDT', '')}
        </div>
        <div className="text-gray-500 dark:text-zinc-600 text-xs mt-0.5">
          {formatDate(trade.executedAt)}
        </div>
      </div>

      <div className="col-span-1">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
          isBuy 
            ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
            : 'bg-red-500/20 text-red-600 dark:text-red-400'
        }`}>
          {trade.side}
        </div>
      </div>

      <div className="col-span-2">
        <div className="text-gray-500 dark:text-zinc-400 text-xs mb-1">Entry Price</div>
        <div className="text-gray-900 dark:text-white font-bold font-disket">
          ${trade.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      <div className="col-span-2">
        <div className="text-gray-500 dark:text-zinc-400 text-xs mb-1">Quantity</div>
        <div className="text-gray-900 dark:text-white font-bold font-disket">
          {trade.quantity} {' '}
          <span className="text-gray-500 dark:text-zinc-600 text-xs">
            ≈ ${trade.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="col-span-2 text-right">
        <div className="text-gray-500 dark:text-zinc-400 text-xs mb-1">Fee</div>
        <div className="text-gray-900 dark:text-white font-bold font-disket">
          ${trade.fee.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
