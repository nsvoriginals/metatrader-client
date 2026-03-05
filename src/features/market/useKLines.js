import { useEffect, useState } from "react";
import { subscribe } from "./WsClient";
import { fetchHistoricalKlines } from "../api/binance";

export function useKlines(symbol) {
  const [candles, setCandles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useKlines initialized for:', symbol);
    let unsubscribe;

    const initializeCandles = async () => {
      setIsLoading(true);
      console.log('Loading started...');
      
      const historical = await fetchHistoricalKlines(symbol, '1m', 100);
      console.log('Historical data:', historical.length, historical);
      
      setCandles(historical);
      console.log('Candles state updated');
      setIsLoading(false);

      unsubscribe = subscribe(
        `${symbol.toLowerCase()}@kline_1m`,
        (data) => {
          console.log('WebSocket data:', data);
          if (!data?.k) return;

          const k = data.k;
          const timeInSeconds = Math.floor(Number(k.t) / 1000);

          if (isNaN(timeInSeconds)) return;

          const newCandle = {
            time: timeInSeconds,
            open: parseFloat(k.o),
            high: parseFloat(k.h),
            low: parseFloat(k.l),
            close: parseFloat(k.c),
          };

          console.log('New candle:', newCandle);

          setCandles((prev) => {
            if (prev.length > 0 && prev[prev.length - 1].time === newCandle.time) {
              return [...prev.slice(0, -1), newCandle];
            }
            return [...prev, newCandle];
          });
        }
      );
    };

    initializeCandles();

    return () => {
      console.log('Cleanup');
      unsubscribe?.();
    };
  }, [symbol]);

  console.log('useKlines render - candles:', candles.length, 'loading:', isLoading);

  return { candles, isLoading };
}