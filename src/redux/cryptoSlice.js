import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickerData: {},
  coinGeckoData: {},
  chartData: {
    labels: [],
    prices: []
  }
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setTickerData(state, action) {
      const { symbol, data } = action.payload;
      state.tickerData[symbol] = { ...state.tickerData[symbol], ...data };
    },
    setCoinGeckoData(state, action) {
      const { symbol, data } = action.payload;
      state.coinGeckoData[symbol] = { ...state.coinGeckoData[symbol], ...data };
    },
    set7DayData(state, action) {
      const { symbol, data } = action.payload;
      state.chartData[symbol] = { ...state.chartData[symbol], ...data };
    },
  },
});

export const { setTickerData, setCoinGeckoData, set7DayData } = cryptoSlice.actions;

export default cryptoSlice.reducer;
