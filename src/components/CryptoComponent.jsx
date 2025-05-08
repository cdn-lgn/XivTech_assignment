import { useSelector } from "react-redux";
import { useCryptoData } from "../customHook/useCryptoData";
import Sparkline from "./Crypto7DChart";

const formatNumber = (num) => {
  if (!num) return '--';
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
};

const CryptoComponent = () => {
  useCryptoData();

  const tickerData = useSelector((state) => state.crypto.tickerData);
  const coinGeckoData = useSelector((state) => state.crypto.coinGeckoData);
  const chartData = useSelector((state) => state.crypto.chartData);

  const symbols = Object.keys(tickerData);

  return (
    <div className="w-full h-full overflow-hidden transition-colors duration-200 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Cryptocurrency Prices
        </h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {["#", "Asset", "Price", "1h %", "24h %", "7d %", "Market Cap", "Volume", "Supply", "Chart"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              {symbols.map((symbol, index) => {
                const item = {
                  ...tickerData[symbol],
                  ...coinGeckoData[symbol],
                  sevenDayData: chartData[symbol],
                };

                return (
                  <tr key={symbol}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={item.image} alt={symbol} className="w-8 h-8 rounded-full" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${Number(item.price).toLocaleString()}
                    </td>
                    {['1h %', '24h %', '7d %'].map((period) => (
                      <td key={period} className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${item[period] > 0
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                          {item[period] > 0 ? '↑' : '↓'} {Math.abs(item[period]).toFixed(2)}%
                        </span>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatNumber(item.market_cap)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatNumber(item.volume_24h)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {item.circulating_supply?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-24 h-12">
                        {item.sevenDayData?.prices?.length ? (
                          <Sparkline prices={item.sevenDayData.prices} />
                        ) : (
                          "--"
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoComponent;
