import {
  START_STOCK_POLLING,
  STOP_STOCK_POLLING,
  STOCK_POLLING_STOPPED,
  WEATHER_REQUEST_RECEIVED,
  WEATHER_REQUEST_ERROR,
  WEATHER_DATA_RECEIVED,
  WEATHER_DATA_UPDATE,
  WEATHER_ZIPCODE_CHANGED,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  zipcode: 78702,
  weatherData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_STOCK_POLLING:
      return { ...state, fetching: true };
    case WEATHER_REQUEST_ERROR:
      return { ...state, error: action.payload };
    case WEATHER_DATA_RECEIVED:
      return {
        ...state,
        fetched: true,
        fetching: false,
        weatherData: action.payload,
      };
    case WEATHER_DATA_UPDATE:
      return {
        ...state,
        fetched: true,
        fetching: false,
        weatherData: action.payload,
      };
    case WEATHER_ZIPCODE_CHANGED:
      return {
        ...state,
        fetched: false,
        fetching: true,
      };
    default:
      return state;
  }
};
