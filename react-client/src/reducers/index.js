import { combineReducers } from 'redux';

import WeatherReducer from './weather';
import StocksReducer from './stocks';
import NewsReducer from './news';
import ProfilesReducer from './profiles';
import UserReducer from './users';
import ParticleReducer from './particle';
import TrafficReducer from './traffic';

const rootReducer = combineReducers({
  user: UserReducer,
  particle: ParticleReducer,
  profiles: ProfilesReducer,
  weather: WeatherReducer,
  stocks: StocksReducer,
  news: NewsReducer,
  traffic: TrafficReducer,
});

export default rootReducer;

