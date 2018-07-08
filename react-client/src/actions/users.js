import axios from 'axios';

import {
  GET_USER_CONFIGS,
  USER_CONFIGS_RECEIVED,
  USER_CONFIGS_ERROR,
} from './types';

const getUserConfigs = (userId) => {
  return (dispatch) => {
    dispatch({ type: GET_USER_CONFIGS });
    axios.get(`/users/${userId}/widgets/config`)
      .then((res) => {
        // console.log('RESPONSE', res.data);
        dispatch({ type: USER_CONFIGS_RECEIVED, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: USER_CONFIGS_ERROR, payload: err });
      });
  };
};

export { getUserConfigs };
