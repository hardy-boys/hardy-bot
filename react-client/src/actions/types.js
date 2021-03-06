// USER

const GET_USER_CONFIGS = 'GET_USER_CONFIGS';
const USER_CONFIGS_RECEIVED = 'USER_CONFIGS_RECEIVED';
const USER_CONFIGS_ERROR = 'USER_CONFIGS_ERROR';

// PARTICLE

const SIGN_IN_TO_PARTICLE = 'SIGN_IN_TO_PARTICLE';
const PARTICLE_SIGN_IN_SUCCESSFUL = 'PARTICLE_SIGN_IN_SUCCESSFUL';
const PARTICLE_SIGN_IN_ERROR = 'PARTICLE_SIGN_IN_ERROR';

const GETTING_DEVICE_INFO = 'GETTING_DEVICE_INFO';
const DEVICE_INFO_RECEIVED = 'DEVICE_INFO_RECEIVED';
const ERROR_RETRIEVING_DEVICE_INFO = 'ERROR_RETRIEVING_DEVICE_INFO';
const DEVICE_STATUS_UPDATE = 'DEVICE_STATUS_UPDATE';
const DEVICE_DIAGNOSTICS_UPDATE = 'DEVICE_DIAGNOSTICS_UPDATE';

// PROFILES

const PROFILE_DATA_RECIEVED = 'PROFILE_DATA_RECIEVED';
const PROFILE_DATA_UPDATE = 'PROFILE_DATA_UPDATE';
const UPDATING_PROFILE_WIDGETS = 'UPDATING_PROFILE_WIDGETS';
const PROFILE_WIDGETS_UPDATED = 'PROFILE_WIDGETS_UPDATED';
const ERROR_UPDATING_PROFILE_WIDGETS = 'ERROR_UPDATING_PROFILE_WIDGETS';
const ACTIVE_PROFILE_RECIEVED = 'ACTIVE_PROFILE_RECIEVED';

// WEATHER

const START_WEATHER_POLLING = 'START_WEATHER_POLLING';
const STOP_WEATHER_POLLING = 'STOP_WEATHER_POLLING';
const WEATHER_POLLING_STOPPED = 'WEATHER_POLLING_STOPPED';
const WEATHER_DATA_RECEIVED = 'WEATHER_DATA_RECEIVED';
const WEATHER_REQUEST_ERROR = 'WEATHER_REQUEST_ERROR';
const WEATHER_DATA_UPDATE = 'WEATHER_DATA_UPDATE';
const SAVE_WEATHER_CONFIG = 'SAVE_WEATHER_CONFIG';
const WEATHER_CONFIG_SAVED = 'WEATHER_CONFIG_SAVED';
const WEATHER_CONFIG_SAVE_ERROR = 'WEATHER_CONFIG_SAVE_ERROR';

// STOCKS

const START_STOCK_POLLING = 'START_STOCK_POLLING';
const STOP_STOCK_POLLING = 'STOP_STOCK_POLLING';
const STOCK_POLLING_STOPPED = 'STOCK_POLLING_STOPPED';

const STOCK_REQUEST_RECEIVED = 'STOCK_REQUEST_RECEIVED';
const STOCK_REQUEST_ERROR = 'STOCK_REQUEST_ERROR';
const STOCK_DATA_RECEIVED = 'STOCK_DATA_RECEIVED';
const STOCK_DATA_UPDATE = 'STOCK_DATA_UPDATE';
const STOCK_SYMBOL_ADDED = 'STOCK_SYMBOL_ADDED';

const SAVE_STOCKS_CONFIG = 'SAVE_STOCKS_CONFIG';
const STOCKS_CONFIG_SAVED = 'STOCKS_CONFIG_SAVED';
const STOCKS_CONFIG_SAVE_ERROR = 'STOCKS_CONFIG_SAVE_ERROR';

// NEWS

const START_NEWS_POLLING = 'START_NEWS_POLLING';
const STOP_NEWS_POLLING = 'STOP_NEWS_POLLING';
const NEWS_POLLING_STOPPED = 'NEWS_POLLING_STOPPED';
const NEWS_REQUEST_ERROR = 'NEWS_REQUEST_ERROR';
const NEWS_DATA_RECEIVED = 'NEWS_DATA_RECEIVED';
const NEWS_DATA_UPDATE = 'NEWS_DATA_UPDATE';

// TRAFFIC

const GETTING_TRAFFIC_DATA = 'GETTING_TRAFFIC_DATA';
const TRAFFIC_DATA_RECEIVED = 'TRAFFIC_DATA_RECEIVED';
const TRAFFIC_REQUEST_ERROR = 'TRAFFIC_REQUEST_ERROR';
const TRAFFIC_DATA_UPDATE = 'TRAFFIC_DATA_UPDATE';

module.exports = {
  // USER

  GET_USER_CONFIGS,
  USER_CONFIGS_RECEIVED,
  USER_CONFIGS_ERROR,

  // PARTICLE

  SIGN_IN_TO_PARTICLE,
  PARTICLE_SIGN_IN_SUCCESSFUL,
  PARTICLE_SIGN_IN_ERROR,

  GETTING_DEVICE_INFO,
  DEVICE_INFO_RECEIVED,
  ERROR_RETRIEVING_DEVICE_INFO,
  DEVICE_STATUS_UPDATE,
  DEVICE_DIAGNOSTICS_UPDATE,

  // PROFILES

  PROFILE_DATA_RECIEVED,
  PROFILE_DATA_UPDATE,
  UPDATING_PROFILE_WIDGETS,
  PROFILE_WIDGETS_UPDATED,
  ERROR_UPDATING_PROFILE_WIDGETS,
  ACTIVE_PROFILE_RECIEVED,

  // WEATHER

  START_WEATHER_POLLING,
  STOP_WEATHER_POLLING,
  WEATHER_POLLING_STOPPED,
  WEATHER_DATA_RECEIVED,
  WEATHER_REQUEST_ERROR,
  WEATHER_DATA_UPDATE,
  SAVE_WEATHER_CONFIG,
  WEATHER_CONFIG_SAVED,
  WEATHER_CONFIG_SAVE_ERROR,

  // STOCKS

  START_STOCK_POLLING,
  STOP_STOCK_POLLING,
  STOCK_POLLING_STOPPED,
  STOCK_REQUEST_RECEIVED,
  STOCK_REQUEST_ERROR,
  STOCK_DATA_RECEIVED,
  STOCK_DATA_UPDATE,
  STOCK_SYMBOL_ADDED,
  SAVE_STOCKS_CONFIG,
  STOCKS_CONFIG_SAVED,
  STOCKS_CONFIG_SAVE_ERROR,

  // NEWS

  START_NEWS_POLLING,
  STOP_NEWS_POLLING,
  NEWS_POLLING_STOPPED,
  NEWS_REQUEST_ERROR,
  NEWS_DATA_RECEIVED,
  NEWS_DATA_UPDATE,

  // TRAFFIC

  GETTING_TRAFFIC_DATA,
  TRAFFIC_DATA_RECEIVED,
  TRAFFIC_REQUEST_ERROR,
  TRAFFIC_DATA_UPDATE,
};
