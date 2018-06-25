import React from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';

import reducers from '../reducers/index';

const middleware = applyMiddleware(logger);

const store = createStore(
  combineReducers({
    state: reducers,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware,
);

export default store;

