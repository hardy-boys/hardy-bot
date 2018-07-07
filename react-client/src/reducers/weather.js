import {
  START_WEATHER_POLLING,
  STOP_WEATHER_POLLING,
  WEATHER_POLLING_STOPPED,
  WEATHER_DATA_RECEIVED,
  WEATHER_DATA_UPDATE,
  WEATHER_REQUEST_ERROR,
  SAVE_WEATHER_CONFIG,
  WEATHER_CONFIG_SAVED,
  WEATHER_CONFIG_SAVE_ERROR,
} from '../actions/types';

const initialState = {
  widgetName: 'Weather',
  zipcode: 78702,
  weatherData: {},
  config: {},
  saving: false,
  saved: false,
  fetching: false,
  fetched: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_WEATHER_POLLING:
      return { ...state, fetching: true };
    case STOP_WEATHER_POLLING:
      return {
        ...state,
      };
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
    case WEATHER_POLLING_STOPPED:
      return {
        ...state,
        fetched: false,
        fetching: false,
      };
    case SAVE_WEATHER_CONFIG:
      return {
        ...state,
        saving: true,
      };
    case WEATHER_CONFIG_SAVED:
      return {
        ...state,
        saving: false,
        saved: true,
      };
    case WEATHER_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case WEATHER_CONFIG_SAVE_ERROR:
      return {
        ...state,
        saved: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
