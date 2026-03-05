import { useEffect, useState, useRef } from 'react';

export function useAggTrades(symbol) {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [status, setStatus] = useState('disconnected');
  const wsRef = useRef(null);
  const countersRef = useRef({ buy: 0, sell: 0 });
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!symbol) return;

    mountedRef.current = true;

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('Already connected for', symbol);
      return;
    }

    console.log('Connecting to agg trades for:', symbol);
    setStatus('connecting');

    const connectTimer = setTimeout(() => {
      if (!mountedRef.current) return;

      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@aggTrade`);
      wsRef.current = ws;
      countersRef.current = { buy: 0, sell: 0 };

      ws.onopen = () => {
        if (!mountedRef.current) {
          ws.close();
          return;
        }
        console.log('AggTrades connected for', symbol);
        setStatus('connected');
      };

      ws.onmessage = (event) => {
        if (!mountedRef.current) return;

        try {
          const trade = JSON.parse(event.data);
          
          if (trade.m) {
            countersRef.current.sell++;
          } else {
            countersRef.current.buy++;
          }

          const total = countersRef.current.buy + countersRef.current.sell;
          if (total % 30 === 0 || total < 30) {
            if (mountedRef.current) {
              setBuy(countersRef.current.buy);
              setSell(countersRef.current.sell);
            }
          }
        } catch (error) {
          console.error('Parse error:', error);
        }
      };

      ws.onerror = () => {
        if (!mountedRef.current) return;
        console.error('WebSocket error for', symbol);
        setStatus('error');
      };

      ws.onclose = () => {
        if (!mountedRef.current) return;
        console.log('WebSocket closed for', symbol);
        setStatus('closed');
      };
    }, 100);

    const updateInterval = setInterval(() => {
      if (mountedRef.current) {
        setBuy(countersRef.current.buy);
        setSell(countersRef.current.sell);
      }
    }, 2000);

    return () => {
      console.log('Cleaning up AggTrades for', symbol);
      mountedRef.current = false;
      clearTimeout(connectTimer);
      clearInterval(updateInterval);
      
      if (wsRef.current) {
        const ws = wsRef.current;
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
        wsRef.current = null;
      }
    };
  }, [symbol]);

  return { buy, sell, status };
}