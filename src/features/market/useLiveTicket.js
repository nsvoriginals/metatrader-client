import { useEffect, useState, useRef } from "react";
import { connect, subscribe } from "./WsClient";

export function useTicker(symbol) {
  const [ticker, setTicker] = useState(null);
  const currentSymbolRef = useRef(symbol);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!symbol) return;

    currentSymbolRef.current = symbol;
    mountedRef.current = true;
    setTicker(null);
    
    connect(symbol);
    
    const unsubscribe = subscribe(`${symbol.toLowerCase()}@ticker`, (data) => {
      if (mountedRef.current && data.s === currentSymbolRef.current) {
        setTicker(data);
      }
    });
    
    return () => {
      mountedRef.current = false;
      unsubscribe();
    };
  }, [symbol]);

  return ticker;
}
