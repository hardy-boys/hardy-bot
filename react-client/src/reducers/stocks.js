import {
  START_STOCK_POLLING,
  STOP_STOCK_POLLING,
  STOCK_POLLING_STOPPED,
  STOCK_REQUEST_ERROR,
  STOCK_DATA_RECEIVED,
  STOCK_DATA_UPDATE,
  STOCK_SYMBOL_ADDED,
  SAVE_STOCKS_CONFIG,
  STOCKS_CONFIG_SAVED,
  STOCKS_CONFIG_SAVE_ERROR,
} from '../actions/types';

const fakeStockData = {
  AAPL: {
    quote: {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      latestPrice: 183.92,
      change: -3.26,
    },
  },
  FB: {
    quote: {
      symbol: 'FB',
      companyName: 'Facebook Inc.',
      latestPrice: 192.73,
      change: 0,
    },
  },
  GOOGL: {
    quote: {
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      latestPrice: 1116.28,
      change: 0,
    },
  },
  AMZN: {
    quote: {
      symbol: 'AMZN',
      companyName: 'Amazon.com Inc.',
      latestPrice: 1693.96,
      change: -19.82,
    },
  },
};

const initialState = {
  widgetName: 'StocksWidget',
  stockSymbols: ['AAPL', 'FB', 'GOOGL'],
  stocksData: fakeStockData,
  saving: false,
  saved: false,
  fetching: false,
  fetched: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_STOCK_POLLING:
      return { ...state, fetching: true };
    case STOP_STOCK_POLLING:
      return {
        ...state,
      };
    case STOCK_DATA_RECEIVED:
      return {
        ...state,
        fetched: true,
        fetching: false,
        stocksData: action.payload,
      };
    case STOCK_DATA_UPDATE:
      return {
        ...state,
        fetched: true,
        fetching: false,
        stocksData: action.payload,
      };
    case STOCK_POLLING_STOPPED:
      return {
        ...state,
        fetched: false,
        fetching: false,
      };
    case SAVE_STOCKS_CONFIG:
      return {
        ...state,
        saving: true,
      };
    case STOCKS_CONFIG_SAVED:
      return {
        ...state,
        saving: false,
        saved: true,
      };
    case STOCK_REQUEST_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case STOCKS_CONFIG_SAVE_ERROR:
      return {
        ...state,
        saved: false,
        error: action.payload,
      };
    case STOCK_SYMBOL_ADDED:
      return {
        ...state,
        fetched: false,
        fetching: false,
        stockSymbols: [...state.stockSymbols, action.payload],
      };
    default:
      return state;
  }
};
