import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries, ColorType } from "lightweight-charts";
import { useKlines } from "../market/useKLines";

export default function CandleChart({ symbol }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const { candles, isLoading } = useKlines(symbol);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    
    if (!chartContainerRef.current) return;

    const bgColor = isDark ? "#0a0a0a" : "#ffffff";
    const textColor = isDark ? "#d1d5db" : "#374151";
    const gridColor = isDark ? "#1a1a1a" : "#e5e7eb";
    const borderColor = isDark ? "#2d2d2d" : "#d1d5db";
    const upColor = isDark ? "#fbbf24" : "#10b981";
    const downColor = isDark ? "#1f2937" : "#ef4444";
    const wickUpColor = isDark ? "#fbbf24" : "#10b981";
    const wickDownColor = isDark ? "#6b7280" : "#ef4444";

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: bgColor },
        textColor: textColor,
      },
      grid: {
        vertLines: { 
          color: gridColor,
          style: 1,
        },
        horzLines: { 
          color: gridColor,
          style: 1,
        },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: "#fbbf24",
          width: 1,
          style: 3,
          labelBackgroundColor: "#fbbf24",
        },
        horzLine: {
          color: "#fbbf24",
          width: 1,
          style: 3,
          labelBackgroundColor: "#fbbf24",
        },
      },
      rightPriceScale: {
        borderColor: borderColor,
        textColor: textColor,
      },
      timeScale: {
        borderColor: borderColor,
        textColor: textColor,
        timeVisible: true,
        secondsVisible: false,
      },
      height: 400,
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: upColor,
      downColor: downColor,
      borderUpColor: upColor,
      borderDownColor: wickDownColor,
      wickUpColor: wickUpColor,
      wickDownColor: wickDownColor,
    });

    chartRef.current = chart;
    seriesRef.current = candlestickSeries;

    const handleResize = () => {
      if (chart && chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };

    setTimeout(handleResize, 0);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chart) {
        chart.remove();
      }
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [isLoading, isDark]);

  useEffect(() => {
    if (!seriesRef.current || isLoading || candles.length === 0) return;

    try {
      seriesRef.current.setData(candles);
      chartRef.current.timeScale().fitContent();
    } catch (error) {
      console.error('Error setting candles:', error);
    }
  }, [candles, isLoading]);

  return (
    <div 
      ref={chartContainerRef}
      className="w-full h-[400px] relative bg-white dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-[#1a1a1a] transition-colors"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-yellow-600 dark:text-yellow-400 text-base font-medium font-disket">
            Loading chart...
          </span>
        </div>
      )}
    </div>
  );
}
