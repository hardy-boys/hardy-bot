import {
  START_NEWS_POLLING,
  STOP_NEWS_POLLING,
  NEWS_POLLING_STOPPED,
  NEWS_REQUEST_ERROR,
  NEWS_DATA_RECEIVED,
  NEWS_DATA_UPDATE,
} from '../actions/types';

const initialState = {
  widgetName: 'NewsWidget',
  searchTerm: 'World Cup',
  articles: [],
  saving: false,
  saved: false,
  fetching: false,
  fetched: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_NEWS_POLLING:
      return { ...state, fetching: true };
    case STOP_NEWS_POLLING:
      return {
        ...state,
      };
    case NEWS_DATA_RECEIVED:
      return {
        ...state,
        fetched: true,
        fetching: false,
        articles: action.payload,
      };
    case NEWS_DATA_UPDATE:
      return {
        ...state,
        fetched: true,
        fetching: false,
        articles: action.payload,
      };
    case NEWS_POLLING_STOPPED:
      return {
        ...state,
        fetched: false,
        fetching: false,
      };
    // case SAVE_WEATHER_CONFIG:
    //   return {
    //     ...state,
    //     saving: true,
    //   };
    // case WEATHER_CONFIG_SAVED:
    //   return {
    //     ...state,
    //     saving: false,
    //     saved: true,
    //   };
    case NEWS_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    // case WEATHER_CONFIG_SAVE_ERROR:
    //   return {
    //     ...state,
    //     saved: false,
    //     error: action.payload,
    //   };
    default:
      return state;
  }
};
