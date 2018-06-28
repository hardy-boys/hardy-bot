import { FETCH_WEATHER, FETCH_WEATHER_ERROR, RECEIVE_WEATHER } from '../actions/weather';

const initialState = {
  fetching: false,
  fetched: false,
  zipcode: null,
  weatherData: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...state, fetching: true };
    case FETCH_WEATHER_ERROR:
      return { ...state, error: action.paylod };
    case RECEIVE_WEATHER:
      return {
        ...state,
        fetched: true,
        fetching: false,
        weatherData: action.payload,
      };
    default:
      return state;
  }
};

