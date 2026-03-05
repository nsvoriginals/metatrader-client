export default function BalanceCard({ balance }) {
  return (
    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-2xl p-12 shadow-lg">
      <div className="text-white/80 text-sm font-medium mb-2 uppercase tracking-wide">
        Total Balance
      </div>
      <div className="text-white text-7xl font-bold font-disket mb-4">
        ${balance.toLocaleString()}
      </div>
      <div className="flex items-center gap-2 text-white/90">
        <span className="text-2xl">↗</span>
        <span className="text-lg font-medium">Available for trading</span>
      </div>
    </div>
  );
}
