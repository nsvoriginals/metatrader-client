export default function StatCard({ label, value, subtext, color = "gray" }) {
  const colorClasses = {
    yellow: 'text-yellow-600 dark:text-yellow-400',
    green: 'text-green-600 dark:text-green-500',
    gray: 'text-gray-800 dark:text-gray-300',
  };

  return (
    <div className="text-right">
      <div className="text-sm text-gray-600 dark:text-gray-500 mb-1">{label}</div>
      <div className={`text-3xl font-bold ${colorClasses[color]} font-disket`}>
        {value}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-600">{subtext}</div>
    </div>
  );
}
