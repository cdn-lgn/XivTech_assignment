Real-Time Crypto Price Tracker.
Please make enhancements per your skill level, and mention those. Send a live link.

🎯 Objective:
Build a responsive React + Redux Toolkit app that tracks real-time crypto prices (like CoinMarketCap), simulating WebSocket updates and managing all state via Redux.

🛠️ Tech Reqs
📊 UI Table:
- Display 5 assets (e.g., BTC, ETH, USDT) in a table:
  # | Logo | Name | Symbol | Price | 1h % | 24h % | 7d % | Market Cap | 24h Volume | Circulating Supply | Max Supply | 7D Chart
- Use sample crypto data.
- Color-code % changes: green (positive), red (negative).
- 7D chart can be static (SVG/image).
- Make table responsive.

🔄 Real-Time Updates:
- Simulate WebSocket using setInterval/mocked class.
- Every 1–2 seconds, randomly change:
  - Price
  - % Changes
  - 24h Volume
- Dispatch Redux actions (no local state).

🧠 Redux State Management:
- Use Redux Toolkit (createSlice, configureStore).
- Store all asset data in Redux.
- Use selectors to optimize re-renders.

✅ Delivery
📁 GitHub/GitLab Repo:
- Push code to repo.
- Include README.md with:
  - Setup instructions
  - Tech stack + architecture
  - Embedded demo GIF or video link

📹 Demo Video/GIF:
- 2–5 min walkthrough showing:
  - UI layout
  - Live updates
  - State flow
  - Thought process

🌟 Bonus:
- Integrate real WebSocket (e.g., Binance)
- Filters/sorting (top gainers, etc.)
- localStorage support
- Unit tests (reducers/selectors)
- TypeScript
Submission deadline: 08 May, 2025
