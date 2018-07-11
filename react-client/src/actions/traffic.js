import axios from 'axios';

import {
  GETTING_TRAFFIC_DATA,
  TRAFFIC_DATA_RECEIVED,
  TRAFFIC_REQUEST_ERROR,
} from './types';

const fetchTraffic = (origin, destination) => {
  return (dispatch) => {
    dispatch({ type: GETTING_TRAFFIC_DATA });
    axios.post('/api/traffic', { origin, destination })
      .then((res) => {
        let data = res.data.resourceSets[0].resources[0];
        dispatch({ type: TRAFFIC_DATA_RECEIVED, payload: data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: TRAFFIC_REQUEST_ERROR, payload: error });
      });
  };
};

export { fetchTraffic };
