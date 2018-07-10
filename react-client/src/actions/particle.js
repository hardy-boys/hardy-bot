import axios from 'axios';

import {
  SIGN_IN_TO_PARTICLE,
  PARTICLE_SIGN_IN_SUCCESSFUL,
  PARTICLE_SIGN_IN_ERROR,
} from './types';

const signInToParticle = () => {
  return (dispatch) => {
    dispatch({ type: SIGN_IN_TO_PARTICLE });
    axios.get('/particle/login')
      .then((res) => {
        // console.log('SIGN IN ACTION RES', res.data);
        dispatch({ type: PARTICLE_SIGN_IN_SUCCESSFUL, payload: res.data });
      })
      .catch((err) => {
        // console.log('SIGN IN ACTION ERR', err);
        dispatch({ type: PARTICLE_SIGN_IN_ERROR, payload: err });
      });
  };
};

export { signInToParticle };
