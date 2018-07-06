import {
  START_STOCK_POLLING,
  STOCK_POLLING_SUCCESSFUL,
  STOP_STOCK_POLLING,
  STOCK_POLLING_STOPPED,
  STOCK_REQUEST_ERROR,
  STOCK_DATA_RECEIVED,
  STOCK_DATA_UPDATE,
  STOCK_SYMBOL_ADDED,
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
  fetching: false,
  fetched: false,
  stockSymbols: ['AAPL', 'FB', 'GOOGL', 'AMZN'],
  stocksData: fakeStockData,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_STOCK_POLLING:
      return { ...state, fetching: true };
    case STOCK_REQUEST_ERROR:
      return { ...state, fetching: false, error: action.payload };
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
        stocksData: action.payload,
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
