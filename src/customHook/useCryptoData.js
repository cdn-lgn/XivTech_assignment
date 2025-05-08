import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBinanceSocket } from "../services/binanceSocket";
import { setCoinGeckoData, setTickerData, set7DayData } from "../redux/cryptoSlice";

const COINGECKO_API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,binancecoin,cardano";

const get7DayData = async (symbol) => {
  const BINANCE_API = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=7`;
  try {
    const response = await fetch(BINANCE_API);
    const data = await response.json();
    const labels = data.map((item) => new Date(item[0]).toLocaleDateString());
    const prices = data.map((item) => parseFloat(item[4])); // Closing price
    return { labels, prices };
  } catch (error) {
    console.error("Failed to fetch 7-day data:", error);
  }
};

function getDummy7dPercentage() {
  return (Math.random() * 20 - 10).toFixed(2);
}

export function useCryptoData() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoinGeckoData = async () => {
      try {
        const response = await fetch(COINGECKO_API);
        const data = await response.json();

        for (const coin of data) {
          const symbol = coin.symbol.toUpperCase() + "USDT";

          dispatch(
            setCoinGeckoData({
              symbol,
              data: {
                symbol,
                name: coin.name,
                image: coin.image,
                market_cap: coin.market_cap,
                circulating_supply: coin.circulating_supply,
                max_supply: coin.max_supply,
                "7d %": getDummy7dPercentage(),
              },
            })
          );
          const { labels, prices } = await get7DayData(symbol);
          dispatch(set7DayData({ symbol, data: { labels, prices } }));
        }
      } catch (error) {
        console.error("Failed to fetch CoinGecko data:", error);
      }
    };

    fetchCoinGeckoData();

    const interval = setInterval(fetchCoinGeckoData, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);


  useEffect(() => {
    const socket = createBinanceSocket(
      (data) => {
        dispatch(
          setTickerData({
            symbol: data.s,
            data: {
              price: parseFloat(data.c).toFixed(2),
              "24h %": parseFloat(data.P).toFixed(2),
              "volume_24h": parseFloat(data.v).toFixed(2),
            },
          })
        );
      },
      (data) => {
        const symbol = data.s;
        const open = parseFloat(data.k.o);
        const close = parseFloat(data.k.c);
        const change1h = ((close - open) / open) * 100;

        dispatch(
          setTickerData({
            symbol,
            data: { "1h %": change1h.toFixed(2) },
          })
        );
      }
    );

    return () => socket.close();
  }, [dispatch]);
}
