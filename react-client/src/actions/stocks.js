import axios from 'axios';

import {
  START_STOCK_POLLING,
  STOP_STOCK_POLLING,
  STOCK_POLLING_STOPPED,
  STOCK_REQUEST_ERROR,
  STOCK_DATA_RECEIVED,
  STOCK_SYMBOL_ADDED,
  SAVE_STOCKS_CONFIG,
  STOCKS_CONFIG_SAVED,
  STOCKS_CONFIG_SAVE_ERROR,
} from './types';

const startStocksPolling = (stockSymbols) => {
  return (dispatch) => {
    dispatch({ type: START_STOCK_POLLING });
    axios.post('/api/stocks', { symbols: stockSymbols })
      .then((res) => {
        console.log('RESPONSE', res.data);
        dispatch({ type: STOCK_DATA_RECEIVED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: STOCK_REQUEST_ERROR, payload: err });
      });
  };
};

const stopStocksPolling = () => {
  return (dispatch) => {
    dispatch({ type: STOP_STOCK_POLLING });
    axios.get('/api/stocks/close')
      .then((res) => {
        console.log(res.data);
        dispatch({ type: STOCK_POLLING_STOPPED });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: STOCK_REQUEST_ERROR });
      });
  };
};

const addNewStock = (symbol) => {
  return {
    type: STOCK_SYMBOL_ADDED,
    payload: symbol,
  };
};

const fetchStocks = (stockSymbols) => {
  return (dispatch) => {
    dispatch({ type: START_STOCK_POLLING });
    axios.post('/api/stocks', { symbols: stockSymbols })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: STOCK_DATA_RECEIVED, payload: res.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: STOCK_REQUEST_ERROR, payload: error });
      });
  };
};

const saveWidgetConfig = (userId, widgetName, payload) => {
  return (dispatch) => {
    dispatch({ type: SAVE_STOCKS_CONFIG });
    axios.post('/widgets/stocks/save', { userId, widgetName, payload })
      .then((res) => {
        dispatch({ type: STOCKS_CONFIG_SAVED });
      })
      .catch((error) => {
        dispatch({ type: STOCKS_CONFIG_SAVE_ERROR, payload: error });
      });
  };
};

export {
  startStocksPolling,
  stopStocksPolling,
  fetchStocks,
  addNewStock,
  saveWidgetConfig,
};
