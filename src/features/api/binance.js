// api/binance.js
export async function fetchHistoricalKlines(symbol, interval = '1m', limit = 100) {
  console.log('Fetching klines for:', symbol);
  
  try {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    console.log('URL:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw data received:', data.length, 'candles');
    
    const formatted = data.map(candle => ({
      time: Math.floor(candle[0] / 1000),
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
    }));
    
    console.log('Formatted candles:', formatted.length);
    console.log('First candle:', formatted[0]);
    
    return formatted;
  } catch (error) {
    console.error('Error fetching klines:', error);
    return [];
  }
}