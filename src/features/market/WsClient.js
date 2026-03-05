let ws = null;
let subscribers = {};
let currentSymbol = null;
let reconnectTimer = null;
let connectionPromise = null;

export function connect(symbol) {
  if (ws && ws.readyState === WebSocket.OPEN && currentSymbol === symbol) {
    return Promise.resolve();
  }

  if (connectionPromise && currentSymbol !== symbol) {
    return connectionPromise.then(() => connect(symbol));
  }

  if (ws) {
    try {
      ws.onclose = null;
      ws.onerror = null;
      ws.onmessage = null;
      ws.close();
    } catch (e) {
      console.error('Error closing WebSocket:', e);
    }
    ws = null;
  }

  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  currentSymbol = symbol;
  
  connectionPromise = new Promise((resolve, reject) => {
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`;
    
    try {
      ws = new WebSocket(wsUrl);
      const connectionTimeout = setTimeout(() => {
        if (ws && ws.readyState !== WebSocket.OPEN) {
          ws.close();
          reject(new Error('Connection timeout'));
        }
      }, 5000);

      ws.onopen = () => {
        clearTimeout(connectionTimeout);
        connectionPromise = null;
        resolve();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.s === currentSymbol) {
            Object.values(subscribers).forEach(callback => {
              callback(data);
            });
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        clearTimeout(connectionTimeout);
        console.error('WebSocket error:', error);
        connectionPromise = null;
        reject(error);
      };

      ws.onclose = () => {
        clearTimeout(connectionTimeout);
        ws = null;
        connectionPromise = null;
        
        if (Object.keys(subscribers).length > 0 && currentSymbol === symbol) {
          reconnectTimer = setTimeout(() => {
            if (currentSymbol === symbol) {
              connect(symbol);
            }
          }, 3000);
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      connectionPromise = null;
      reject(error);
    }
  });

  return connectionPromise;
}

export function subscribe(channel, callback) {
  const id = Math.random().toString(36).substring(7);
  subscribers[id] = callback;

  return () => {
    delete subscribers[id];
    
    if (Object.keys(subscribers).length === 0) {
      if (ws) {
        ws.onclose = null;
        ws.close();
        ws = null;
      }
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      currentSymbol = null;
      connectionPromise = null;
    }
  };
}

export function disconnect() {
  if (ws) {
    ws.onclose = null;
    ws.close();
    ws = null;
  }
  subscribers = {};
  currentSymbol = null;
  connectionPromise = null;
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
}

export function getStatus() {
  return {
    connected: ws?.readyState === WebSocket.OPEN,
    symbol: currentSymbol,
    subscriberCount: Object.keys(subscribers).length
  };
}
