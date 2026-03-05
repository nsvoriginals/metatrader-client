import { useEffect, useState } from "react";

export function useMultipleTickers(symbols) {
  const [tickers, setTickers] = useState({});

  useEffect(() => {
    if (!symbols || symbols.length === 0) return;

   
    const streams = symbols.map(s => `${s.toLowerCase()}@ticker`).join('/');
    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;
    
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Multi-ticker WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const data = message.data;
        
        if (data && data.s) {
          setTickers(prev => ({
            ...prev,
            [data.s]: data
          }));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Multi-ticker WebSocket closed');
    };


    return () => {
      ws.close();
    };
  }, [symbols.join(',')]); 

  return tickers;
}