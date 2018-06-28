import axios from 'axios';

import config from '../../src/config';

const FETCH_WEATHER = 'FETCH_WEATHER';
const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';

const fetchWeather = (zip) => {
  return (dispatch) => {
    dispatch({ type: FETCH_WEATHER });
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?appid=${config.OPEN_WEATHER_MAP_API_KEY}&zip=${zip}`)
      .then((weather) => {
        dispatch({ type: RECEIVE_WEATHER, payload: weather.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_WEATHER_ERROR, payload: error });
      });
  };
};

export {
  FETCH_WEATHER,
  RECEIVE_WEATHER,
  FETCH_WEATHER_ERROR,
  fetchWeather,
};

