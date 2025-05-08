# Crypto Price Tracker

Real-time cryptocurrency price tracker built with React and Redux Toolkit, featuring live price updates via WebSocket integration.

![Demo GIF](demo.gif)

## 🚀 Features

- Real-time price updates via Binance WebSocket
- Live price charts with 7-day history
- Color-coded price movements
- Responsive design with neumorphic UI
- Automatic data refresh and WebSocket reconnection

## 🛠️ Tech Stack

- **Frontend:** React 18
- **State Management:** Redux Toolkit
- **Real-time Data:** Binance WebSocket API
- **Additional Data:** CoinGecko API
- **Charts:** Chart.js with react-chartjs-2
- **Styling:** TailwindCSS

## 🏗️ Architecture

```
src/
├── components/          # React components
│   ├── CryptoComponent.jsx    # Main crypto table
│   └── Crypto7DChart.jsx      # Price chart component
├── redux/              # Redux state management
│   └── cryptoSlice.js         # Crypto data slice
├── services/           # External services
│   └── binanceSocket.js       # WebSocket connection
├── customHook/         # Custom React hooks
│   └── useCryptoData.js       # Data fetching hook
└── App.js             # Root component
```

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## 🔄 Data Flow

1. **Initial Load:**
   - CoinGecko API fetches basic crypto information
   - Binance API fetches 7-day historical data
   - Redux store is populated with initial data

2. **Real-time Updates:**
   - Binance WebSocket provides live price updates
   - Price changes trigger Redux actions
   - UI automatically updates through Redux selectors

3. **WebSocket Reconnection:**
   - Automatic reconnection on connection loss
   - Exponential backoff retry mechanism
   - Connection status monitoring

## 🎯 API Integration

### Binance WebSocket
```javascript
const BINANCE_WS_URL = "wss://stream.binance.com:9443/stream?streams=..."
```
- Provides real-time price updates
- Returns ticker and kline data
- Supports multiple currency pairs

### CoinGecko API
```javascript
const COINGECKO_API = "https://api.coingecko.com/api/v3/coins/markets?..."
```
- Fetches market data and metadata
- Updates every 5 seconds
- Provides additional market metrics

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 License

MIT License - feel free to use this project for learning or development.
