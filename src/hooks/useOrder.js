import { useState } from 'react';
import { orderAPI } from '@/services/api';

export function useOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const placeOrder = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await orderAPI.placeOrder(orderData);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { placeOrder, loading, error };
}
