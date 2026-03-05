// hooks/useTopPerformers.js
import { useEffect, useState } from 'react';

export function useTopPerformers() {
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPerformers = async () => {
      try {
        // Fetch 24h ticker data for all symbols
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const data = await response.json();
        
        // Filter USDT pairs and sort by price change percentage
        const usdtPairs = data
          .filter(item => item.symbol.endsWith('USDT') && parseFloat(item.priceChangePercent) > 0)
          .sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
          .slice(0, 50); // Top 50 gainers
        
        setPerformers(usdtPairs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top performers:', error);
        setLoading(false);
      }
    };

    fetchTopPerformers();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchTopPerformers, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { performers, loading };
}
