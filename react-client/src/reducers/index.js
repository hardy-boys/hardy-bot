import { combineReducers } from 'redux';

import WeatherReducer from './weather';
import StocksReducer from './stocks';
import NewsReducer from './news';
import ProfilesReducer from './profiles';
import UserReducer from './users';
import ParticleReducer from './particle';

const rootReducer = combineReducers({
  user: UserReducer,
  particle: ParticleReducer,
  profiles: ProfilesReducer,
  weather: WeatherReducer,
  stocks: StocksReducer,
  news: NewsReducer,
});

export default rootReducer;

