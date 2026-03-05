import PerformerCard from './PerformerCard';

export default function PerformersGrid({ performers, startRank = 4 }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300 mb-4 font-disket">
        Top {startRank}-50 Performers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {performers.slice(3).map((performer, index) => (
          <PerformerCard 
            key={performer.symbol} 
            performer={performer}
            rank={index + startRank}
          />
        ))}
      </div>
    </div>
  );
}
