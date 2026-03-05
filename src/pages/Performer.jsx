import { useTopPerformers } from '@/hooks/useTopPerformers';
import PerformersHero from '@/components/performers/PerformersHero';
import TopChampions from '@/components/performers/TopChampions';
import PerformersGrid from '@/components/performers/PerformersGrid';
import PerformersLoading from '@/components/performers/PerformersLoading';

export default function PerformersPage() {
  const { performers, loading } = useTopPerformers();

  if (loading) {
    return <PerformersLoading />;
  }

  const avgGain = performers.length > 0 
    ? (performers.reduce((sum, p) => sum + parseFloat(p.priceChangePercent), 0) / performers.length).toFixed(2)
    : 0;

  const totalVolume = performers.reduce((sum, p) => sum + parseFloat(p.quoteVolume), 0);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <PerformersHero 
        performers={performers}
        avgGain={avgGain}
        totalVolume={totalVolume}
      />

      <main className="p-6 max-w-[1800px] mx-auto">
        <TopChampions performers={performers} />
        <PerformersGrid performers={performers} startRank={4} />
      </main>
    </div>
  );
}
