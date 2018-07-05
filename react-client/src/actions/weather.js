import axios from 'axios';

import { WEATHER_ZIPCODE_CHANGED, WEATHER_DATA_RECEIVED, WEATHER_REQUEST_ERROR } from './types';

const fetchWeather = (zip) => {
  return (dispatch) => {
    dispatch({ type: WEATHER_ZIPCODE_CHANGED });
    axios.post('/api/weather', { zip })
      .then((weather) => {
        console.log('NEW WEATHER RECEIVED', weather.data);
        dispatch({ type: WEATHER_DATA_RECEIVED, data: weather.data });
      })
      .catch((error) => {
        dispatch({ type: WEATHER_REQUEST_ERROR, data: error });
      });
  };
};


export default fetchWeather;
