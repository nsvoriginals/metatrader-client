export default function PerformersLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center transition-colors">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-500 dark:border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400 font-disket">Loading top performers...</p>
      </div>
    </div>
  );
}
