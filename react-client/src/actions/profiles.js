import axios from 'axios';

import {
  PROFILE_DATA_RECIEVED,
  PROFILE_DATA_UPDATE,
} from './types';

const fetchProfilesFromDB = () => {
  return (dispatch) => {
    axios.get('/profile/loadAll')
      .then((result) => {
        let { data } = result;
        let profileData = data.map((prof) => {
          prof.editing = false;
          prof.deleting = false;
          return prof;
        });
        console.log('act ', profileData)
        dispatch({ type: PROFILE_DATA_RECIEVED, payload: profileData });
      })
      .catch((err) => {
        console.log(`Error loading profiles: ${err}`);
      });
  };
};

const updateProfiles = (profileData) => {
  return (dispatch) => {
    dispatch({ type: PROFILE_DATA_UPDATE, payload: profileData });
  };
};

export {
  fetchProfilesFromDB,
  updateProfiles,
};
