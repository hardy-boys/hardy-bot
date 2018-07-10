import {
  SIGN_IN_TO_PARTICLE,
  PARTICLE_SIGN_IN_SUCCESSFUL,
  PARTICLE_SIGN_IN_ERROR,
} from '../actions/types';

const initialState = {
  devices: [],
  signingInToParticle: false,
  signedInToParticle: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_TO_PARTICLE:
      return {
        ...state,
        signingInToParticle: true,
      };
    case PARTICLE_SIGN_IN_SUCCESSFUL:
      return {
        ...state,
        signingInToParticle: false,
        signedInToParticle: true,
        devices: action.payload,
      };
    case PARTICLE_SIGN_IN_ERROR:
      return {
        ...state,
        signingInToParticle: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
