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
        console.log('act ', profileData);
        dispatch({ type: PROFILE_DATA_RECIEVED, payload: profileData });
      })
      .catch((err) => {
        console.log(`Error loading profiles: ${err}`);
      });
  };
};

const deployProfileToDevice = (profile) => {
  return (dispatch) => {
    axios.post('/profile/apply', {
      deviceName: 'savvy-fox',
      profileData:
      {
        profile: profile.widgets,
        switchMode: 'Manual',
      },
    })
      .then((result) => {
        console.log(result.data);
        dispatch({ type: null, payload: null });
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
  deployProfileToDevice,
};
