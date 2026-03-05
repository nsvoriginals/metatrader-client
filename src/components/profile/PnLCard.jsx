export default function PnLCard({ label, value, period }) {
  const isPositive = value >= 0;
  
  return (
    <div className="bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 p-8 transition-colors">
      <div className="text-gray-600 dark:text-zinc-500 text-sm font-medium mb-3 uppercase tracking-wide">
        {label}
      </div>
      <div className={`text-5xl font-bold mb-2 font-disket ${
        isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
      }`}>
        {isPositive ? '+' : ''}{value.toLocaleString()}
      </div>
      <div className="text-gray-500 dark:text-zinc-600 text-sm">
        {period}
      </div>
    </div>
  );
}
