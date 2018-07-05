import axios from 'axios';

import { STOCK_REQUEST_ERROR, NEW_STOCK_DATA_RECEIVED, STOCK_SYMBOL_ADDED } from './types';

const fetchStocks = (symbol) => {
  return (dispatch) => {
    dispatch({ type: STOCK_SYMBOL_ADDED });
    axios.post('/api/stocks', { symbol })
      .then((stock) => {
        console.log('NEW STOCK DATA RECEIVED', stock.data);
        dispatch({ type: NEW_STOCK_DATA_RECEIVED, data: { [symbol]: stock.data } });
      })
      .catch((error) => {
        dispatch({ type: STOCK_REQUEST_ERROR, data: error });
      });
  };
};


export default fetchStocks;
