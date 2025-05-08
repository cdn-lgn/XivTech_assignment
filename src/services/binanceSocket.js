const BINANCE_WS_URL ="wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/btcusdt@kline_1h/ethusdt@ticker/ethusdt@kline_1h/adausdt@ticker/adausdt@kline_1h/xrpusdt@ticker/xrpusdt@kline_1h/bnbusdt@ticker/bnbusdt@kline_1h"
;

export function createBinanceSocket(onTickerUpdate, onKlineUpdate) {
  const socket = new WebSocket(BINANCE_WS_URL);

  socket.onopen = () => {
    console.log("[Socket] Connected to Binance WebSocket");
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      const data = message.data;

      if (!data || !data.e) return;

      if (data.e === "24hrTicker") {
        onTickerUpdate(data);
      }

      if (data.e === "kline" && data.k.i === "1h") {
        onKlineUpdate(data);
      }

    } catch (error) {
      console.error("[Socket] Error parsing message:", error);
    }
  };

  socket.onerror = (error) => {
    console.error("[Socket] WebSocket error:", error);
  };

  socket.onclose = () => {
    console.warn("[Socket] Disconnected. Reconnecting...");
    setTimeout(() => createBinanceSocket(onTickerUpdate, onKlineUpdate), 3000);
  };

  return socket;
}
