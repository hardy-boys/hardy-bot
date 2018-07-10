import { GET_USER_CONFIGS, USER_CONFIGS_RECEIVED, USER_CONFIGS_ERROR } from '../actions/types';

const initialState = {
  userId: null,
  configurations: [],
  fetching: false,
  fetched: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CONFIGS:
      return {
        ...state,
        fetching: true,
      };
    case USER_CONFIGS_RECEIVED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        configurations: action.payload,
      };
    case USER_CONFIGS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
