import { useState, useEffect } from 'react';
import { portfolioAPI, tradeAPI } from '@/services/api';

export function useUserProfile() {
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

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [portfolioResponse, tradesResponse] = await Promise.all([
        portfolioAPI.get(),
        tradeAPI.getAll(),
      ]);

      const portfolioData = portfolioResponse.data;
      const tradesData = tradesResponse.data || [];

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
      setError(err.message);
      setLoading(false);
    }
  };

  const filterTrades = (type) => {
    if (type === 'all') return trades;
    return trades.filter(trade => trade.type?.toLowerCase() === type.toLowerCase());
  };

  return { 
    profile, 
    trades, 
    loading, 
    error,
    refetch: fetchProfileData,
    filterTrades,
  };
}
