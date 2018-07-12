import {
  GETTING_TRAFFIC_DATA,
  TRAFFIC_DATA_RECEIVED,
  TRAFFIC_REQUEST_ERROR,
  TRAFFIC_DATA_UPDATE,
} from '../actions/types';

const initialState = {
  widgetName: 'TrafficWidget',
  trafficData: {},
  fetching: false,
  fetched: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETTING_TRAFFIC_DATA:
      return {
        ...state,
        fetching: true,
      };
    case TRAFFIC_DATA_RECEIVED:
      return {
        ...state,
        fetched: true,
        fetching: false,
        trafficData: action.payload,
      };
    case TRAFFIC_REQUEST_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case TRAFFIC_DATA_UPDATE:
      return {
        ...state,
        fetching: false,
        fetched: true,
        trafficData: action.payload,
      };
    default:
      return state;
  }
};
