import { useState, useEffect } from 'react';
import axios from 'axios';
import BalanceCard from '@/components/profile/BalanceCard';
import PnLCard from '@/components/profile/PnLCard';
import StatsCard from '@/components/profile/StatsCard';
import TradeRow from '@/components/profile/TradeRow';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function ProfilePage() {
  const navigate=useNavigate();
  const [profile, setProfile] = useState({
    id: '',
    cashBalance: 0,
    totalValue: 0,
    totalReturn: 0,
    holdings: [],
    totalTrades: 0,
    winRate: 0,
  });
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login')
        throw new Error('No authentication token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [portfolioRes, tradesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/portfolio`, { headers }),
        axios.get(`${API_BASE_URL}/api/trades`, { headers }),
      ]);

      const portfolioData = portfolioRes.data.data;
      const tradesData = tradesRes.data.data || [];

      const winningTrades = tradesData.filter(t => t.pnl && t.pnl > 0).length;
      const winRate = tradesData.length > 0 
        ? ((winningTrades / tradesData.length) * 100).toFixed(1) 
        : 0;

      setProfile({
        id: portfolioData.id,
        cashBalance: portfolioData.cashBalance || 0,
        totalValue: portfolioData.totalValue || 0,
        totalReturn: portfolioData.totalReturn || 0,
        holdings: portfolioData.holdings || [],
        totalTrades: tradesData.length,
        winRate: parseFloat(winRate),
      });

      setTrades(tradesData);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch profile data:', err);
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  const filterTrades = (type) => {
    if (type === 'all') return trades;
    return trades.filter(trade => trade.type?.toLowerCase() === type.toLowerCase());
  };

  const winningTrades = Math.round((profile.winRate / 100) * profile.totalTrades);
  const losingTrades = profile.totalTrades - winningTrades;

  const displayedTrades = activeFilter === 'all' 
    ? trades 
    : filterTrades(activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-disket">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 font-disket mb-4">Failed to load portfolio</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{error}</p>
          <button 
            onClick={fetchProfileData}
            className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all font-disket"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-3 font-disket">
            Portfolio
          </h1>
          <p className="text-gray-600 dark:text-zinc-500 text-lg">
            Track your trading performance and history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <BalanceCard balance={profile.cashBalance} />
          </div>

          <div className="space-y-6">
            <PnLCard label="Total Return" value={profile.totalReturn} period="All Time" />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 p-12 mb-12 transition-colors">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <StatsCard value={profile.totalTrades} label="Total Trades" color="white" />
            <StatsCard value={winningTrades} label="Winning" color="green" />
            <StatsCard value={losingTrades} label="Losing" color="red" />
            <StatsCard value={`${profile.winRate}%`} label="Win Rate" color="yellow" />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 p-8 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-disket">
              Recent Trades
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeFilter === 'all'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 dark:bg-zinc-900 text-gray-700 dark:text-zinc-400 hover:bg-gray-300 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('buy')}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeFilter === 'buy'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-zinc-900 text-gray-700 dark:text-zinc-400 hover:bg-gray-300 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveFilter('sell')}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeFilter === 'sell'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 dark:bg-zinc-900 text-gray-700 dark:text-zinc-400 hover:bg-gray-300 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Sell
              </button>
            </div>
          </div>

          {displayedTrades.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 font-disket">
                No {activeFilter !== 'all' ? activeFilter : ''} trades found
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {displayedTrades.slice(0, 5).map((trade) => (
                  <TradeRow key={trade.id} trade={trade} />
                ))}
              </div>

              {displayedTrades.length > 5 && (
                <div className="mt-8 text-center">
                  <button className="px-8 py-3 bg-gray-200 dark:bg-zinc-900 text-gray-900 dark:text-white text-sm font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-800 transition-all font-disket">
                    View All {displayedTrades.length} Trades →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
