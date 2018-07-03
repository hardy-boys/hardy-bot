import { combineReducers } from 'redux';

import WeatherReducer from './weather';
import StocksReducer from './stocks';
import DevicesReducer from './devices';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  stocks: StocksReducer,
  userDevices: DevicesReducer,

});

export default rootReducer;

