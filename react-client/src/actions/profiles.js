import axios from 'axios';

import {
  PROFILE_DATA_RECIEVED,
  PROFILE_DATA_UPDATE,
  UPDATING_PROFILE_WIDGETS,
  PROFILE_WIDGETS_UPDATED,
  ERROR_UPDATING_PROFILE_WIDGETS,
  ACTIVE_PROFILE_RECIEVED,
} from './types';

const fetchProfilesFromDB = () => {
  return (dispatch) => {
    // get profiles
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

const fetchActiveProfile = () => {
  // get active profile
  return (dispatch) => {
    axios.get('/profile/active')
      .then((result) => {
        let { data } = result;
        dispatch({ type: ACTIVE_PROFILE_RECIEVED, payload: data });
      })
      .catch((err) => {
        console.log(`Error loading profiles: ${err}`);
      });
  };
};

const deployProfileToDevice = (profile, device) => {
  return (dispatch) => {
    console.log('Deploying profile to device');
    axios.post('/profile/apply', {
      deviceName: device,
      profileData:
      {
        profileName: profile.profile,
        profile: profile.widgets,
        switchMode: 'Manual',
      },
    })
      .then((result) => {
        console.log('Successfully deployed: ', result.data);
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

const updateProfileWidgets = (profileName, widgetName) => {
  return (dispatch) => {
    dispatch({ type: UPDATING_PROFILE_WIDGETS });
    axios.post('/profile/updateWidgets', { profileName, widgetName })
      .then((result) => {
        console.log('SUCCESS IN UPDATING PROFILE', result);
        dispatch({ type: PROFILE_WIDGETS_UPDATED, payload: result });
      })
      .catch((err) => {
        console.log('ERROR UPDATING PROFILE', err);
        dispatch({ type: ERROR_UPDATING_PROFILE_WIDGETS, payload: err });
      });
  };
};

const saveProfileToDB = (profileData, profIdx, prevName) => {
  return (dispatch) => {
    // 1) set mode to not editing and finalize local state changes
    let _profileData = profileData;
    _profileData[profIdx].editing = false;
    dispatch({ type: PROFILE_DATA_UPDATE, payload: _profileData });

    // 2) remove old profile from db if previously established
    if (prevName) {
      axios.post('/profile/delete', {
        profileName: prevName,
      })
        .then(() => {
          // 3) save new profiles to db
          return axios.post('/profile/save', {
            profileName: _profileData[profIdx].profile,
            widgetNames: _profileData[profIdx].widgets,
          });
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(`Error in save profile function: ${err}`);
        });
    } else {
      axios.post('/profile/save', {
        profileName: _profileData[profIdx].profile,
        widgetNames: _profileData[profIdx].widgets,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(`Error in save profile function: ${err}`);
        });
    }
  };
};

const deleteProfileFromDB = (profileData, profIdx) => {
  return (dispatch) => {
    // 1) close modal
    let _profileData = profileData;
    _profileData[profIdx].deleting = false;
    dispatch({ type: PROFILE_DATA_UPDATE, payload: _profileData });

    // 2) remove from db
    axios.post('/profile/delete', {
      profileName: profileData[profIdx].profile,
    })
      .then(() => {
        // 3) remove from our state
        _profileData.splice(profIdx, 1);
        dispatch({ type: PROFILE_DATA_UPDATE, payload: _profileData });
      })
      .catch((err) => {
        console.log(`Error deleting profile from db: ${err}`);
      });
  };
};

export {
  fetchProfilesFromDB,
  updateProfiles,
  deployProfileToDevice,
  updateProfileWidgets,
  saveProfileToDB,
  deleteProfileFromDB,
  fetchActiveProfile,
};
