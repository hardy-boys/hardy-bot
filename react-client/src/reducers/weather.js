import { WEATHER_REQUEST_RECEIVED, WEATHER_REQUEST_ERROR, WEATHER_DATA_RECEIVED, WEATHER_DATA_UPDATE } from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  zipcode: null,
  weatherData: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WEATHER_REQUEST_RECEIVED:
      return { ...state, fetching: true };
    case WEATHER_REQUEST_ERROR:
      return { ...state, error: action.data };
    case WEATHER_DATA_RECEIVED:
      return {
        ...state,
        fetched: true,
        fetching: false,
        weatherData: action.data,
      };
    case WEATHER_DATA_UPDATE:
      return {
        ...state,
        fetched: true,
        fetching: false,
        weatherData: action.data,
      };
    default:
      return state;
  }
};
