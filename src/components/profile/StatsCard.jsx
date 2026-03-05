export default function StatsCard({ value, label, color }) {
  const colorClasses = {
    white: 'text-gray-900 dark:text-white',
    green: 'text-green-600 dark:text-green-500',
    red: 'text-red-600 dark:text-red-500',
    yellow: 'text-yellow-600 dark:text-yellow-500'
  };

  return (
    <div className="text-center">
      <div className={`text-6xl font-bold mb-3 font-disket ${colorClasses[color]}`}>
        {value}
      </div>
      <div className="text-gray-600 dark:text-zinc-500 text-sm uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}
