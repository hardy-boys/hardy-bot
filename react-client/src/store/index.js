import React from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';

import reducers from '../reducers';

const middleware = applyMiddleware(logger);

const store = createStore(
  reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    middleware,
  ),
);

export default store;

