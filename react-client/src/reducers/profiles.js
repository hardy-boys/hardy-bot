import {
  LOGGING_IN_DEVICE,
  ERROR_LOGGING_IN,
  LOGGED_IN,
  PROFILE_DATA_RECIEVED,
  PROFILE_DATA_UPDATE,
  UPDATING_PROFILE_WIDGETS,
  PROFILE_WIDGETS_UPDATED,
  ERROR_UPDATING_PROFILE_WIDGETS,
  ACTIVE_PROFILE_RECIEVED,
} from '../actions/types';

const initialState = {
  userId: 2,
  devices: [],
  currentDevice: {},
  profileData: [],
  profileBackup: [],
  activeProfile: '',
  loading: true,
  isOnline: false,
  loggingIn: false,
  loggedIn: false,
  updatingProfile: false,
  profileUpdated: false,
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
    case PROFILE_DATA_RECIEVED:
      return {
        ...state,
        loading: false,
        profileData: action.payload,
        profileBackup: JSON.parse(JSON.stringify(action.payload)), // make a copy to restore later
      };
    case PROFILE_DATA_UPDATE:
      return {
        ...state,
        profileData: action.payload,
      };
    case ACTIVE_PROFILE_RECIEVED:
      return {
        ...state,
        activeProfile: action.payload,
      };
    case UPDATING_PROFILE_WIDGETS:
      return {
        ...state,
        updatingProfile: true,
      };
    case PROFILE_WIDGETS_UPDATED:
      return {
        ...state,
        updatingProfile: false,
        profileUpdated: true,
      };
    case ERROR_UPDATING_PROFILE_WIDGETS:
      return {
        ...state,
        updatingProfile: false,
        profileUpdated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
