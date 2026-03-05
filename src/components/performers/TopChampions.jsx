import PerformerCard from './PerformerCard';

export default function TopChampions({ performers }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-4 font-disket">
        🏆 Top 3 Champions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {performers.slice(0, 3).map((performer, index) => (
          <PerformerCard 
            key={performer.symbol} 
            performer={performer}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
