import React from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import reducers from '../reducers';

const socket = io.connect();

const socketIoMiddleware = createSocketIoMiddleware(socket, (type, action) => action.io);

const middleware = applyMiddleware(logger, thunk, socketIoMiddleware);

const store = createStore(
  reducers,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;

