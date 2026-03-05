import { memo, useState } from 'react';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import axios from 'axios';
import { useTicker } from '@/features/market/useLiveTicket';
import StockHeader from "../features/stock/StockHeader";
import CandleChart from "@/features/stock/CandleStick";
import { BuySellStats } from "@/features/stock/Stats";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function StockPage({ symbol , onBack }) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderSide, setOrderSide] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const ticker = useTicker(symbol);
  const currentPrice = ticker ? parseFloat(ticker.c) : 0;

  const handleBuyClick = () => {
    setOrderSide('BUY');
    setPrice(currentPrice.toFixed(2));
    setShowOrderModal(true);
  };

  const handleSellClick = () => {
    setOrderSide('SELL');
    setPrice(currentPrice.toFixed(2));
    setShowOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    setOrderSide(null);
    setQuantity('');
    setPrice('');
    setError(null);
  };

  const handleSubmitOrder = async () => {
    if (!quantity || parseFloat(quantity) <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Please login to place orders');
      }

      const orderData = {
        symbol: symbol,
        side: orderSide,
        type: "MARKET",
        quantity: parseFloat(quantity),
        price: parseFloat(price),
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/orders/placeorder`,
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert(`${orderSide} order placed successfully! `);
      handleCloseModal();
      setLoading(false);
    } catch (err) {
      console.error('Order placement failed:', err);
      setError(err.response?.data?.message || err.message || 'Failed to place order');
      setLoading(false);
    }
  };

  const totalValue = quantity && price ? (parseFloat(quantity) * parseFloat(price)).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <main className="p-6 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-lg text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-zinc-700 transition-all"
            >
              <span>←</span>
              <span className="font-disket">Back to Markets</span>
            </button>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleBuyClick}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold font-disket transition-all bg-green-500/10 text-green-700 dark:text-green-500 border border-green-500/30 hover:bg-green-500/20 hover:border-green-500/50"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Buy</span>
            </button>

            <button
              onClick={handleSellClick}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold font-disket transition-all bg-red-500/10 text-red-700 dark:text-red-500 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50"
            >
              <TrendingDown className="w-4 h-4" />
              <span>Sell</span>
            </button>
          </div>
        </div>

        {showOrderModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-2xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-disket">
                  {orderSide === 'BUY' ? 'Buy' : 'Sell'} {symbol.replace('USDT', '')}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className={`p-4 rounded-lg border-2 ${
                  orderSide === 'BUY'
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Type</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white font-disket">
                    MARKET ORDER
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white font-disket text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    step="0.001"
                    min="0"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Amount of {symbol.replace('USDT', '')} to {orderSide === 'BUY' ? 'buy' : 'sell'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Price (USDT)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white font-disket text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    step="0.01"
                    min="0"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Current market price: ${currentPrice.toLocaleString()}
                  </div>
                </div>

                {quantity && price && (
                  <div className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white font-disket">
                        ${totalValue}
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-zinc-800">
                <button
                  onClick={handleCloseModal}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={loading || !quantity || !price}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold font-disket transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    orderSide === 'BUY'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {loading ? 'Placing Order...' : `${orderSide === 'BUY' ? 'Buy' : 'Sell'} Now`}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          <StockHeader symbol={symbol} />

          <section className="bg-gray-50 dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-4 transition-colors">
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-4">
              Price Chart
            </h2>
            <CandleChart symbol={symbol} />
          </section>

          <section className="bg-gray-50 dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-4 transition-colors">
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-4">
              Order Flow Analysis
            </h2>
            <BuySellStats symbol={symbol} />
          </section>

          <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-600">
            <p>Live data from Binance • Real-time WebSocket updates</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default memo(StockPage);
