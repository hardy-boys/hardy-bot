import axios from 'axios';

import { STOCK_REQUEST_RECEIVED, STOCK_SYMBOL_ADDED } from './types';

const fetchStocks = (stockSymbols) => {
  return (dispatch) => {
    dispatch({ type: STOCK_REQUEST_RECEIVED });
    axios.post('/api/stocks', { symbols: stockSymbols });
  };
};

const addNewStock = (symbol) => {
  return {
    type: STOCK_SYMBOL_ADDED,
    payload: symbol,
  };
};

export {
  fetchStocks,
  addNewStock,
};
