import axios from 'axios';

import {
  SIGN_IN_TO_PARTICLE,
  PARTICLE_SIGN_IN_SUCCESSFUL,
  PARTICLE_SIGN_IN_ERROR,

  GETTING_DEVICE_INFO,
  DEVICE_INFO_RECEIVED,
  ERROR_RETRIEVING_DEVICE_INFO,
} from './types';

const signInToParticle = () => {
  return (dispatch) => {
    dispatch({ type: SIGN_IN_TO_PARTICLE });
    axios.get('/particle/login')
      .then((res) => {
        // console.log('SIGN IN ACTION RES', res.data);
        const deviceName = res.data[0].name;

        dispatch({ type: PARTICLE_SIGN_IN_SUCCESSFUL, payload: res.data });
        dispatch({ type: GETTING_DEVICE_INFO });
        axios.post('/particle/stats', { deviceName })
          .then((deviceInfo) => {
            let deviceStats = deviceInfo.data;
            // console.log('DEVICE INFO RECEIVED', deviceInfo.data);
            dispatch({ type: DEVICE_INFO_RECEIVED, payload: { deviceName, deviceStats } });
          })
          .catch((err) => {
            dispatch({ type: ERROR_RETRIEVING_DEVICE_INFO, payload: err });
          });
      })
      .catch((err) => {
        // console.log('SIGN IN ACTION ERR', err);
        dispatch({ type: PARTICLE_SIGN_IN_ERROR, payload: err });
      });
  };
};

export { signInToParticle };
