import { LOGGING_IN_DEVICE, ERROR_LOGGING_IN, LOGGED_IN } from '../actions/types';

const initialState = {
  userId: 2,
  devices: [],
  currentDevice: {},
  isOnline: false,
  loggingIn: false,
  loggedIn: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN_DEVICE:
      return { ...state, loggingIn: true };
    case ERROR_LOGGING_IN:
      return { ...state, error: action.data };
    case LOGGED_IN:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        devices: action.data.devices,
        currentDevice: action.data.currentDevice,
        isOnline: true,
      };
    default:
      return state;
  }
};
