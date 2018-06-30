import { combineReducers } from 'redux';

import WeatherReducer from './weather';
import StocksReducer from './stocks';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  stocks: StocksReducer,

});

export default rootReducer;

