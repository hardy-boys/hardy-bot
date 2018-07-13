const express = require('express');
const dbHelpers = require('../../database/controllers/dbHelpers');
const particleHelpers = require('../helpers/particleHelpers.js');

const router = express.Router();

router.post('/profile/save', (req, res) => {
  // format => req.body: {profileName: "ExampleProfile", widgetNames: ["Weather", "News" ...]}
  if (!req.body || !req.body.profileName || !req.body.widgetNames) {
    res.status(400).send('Err: Improperly formatted profile save request');
  }
  dbHelpers.saveProfile(null, req.body.profileName, req.body.widgetNames);
  res.status(201).send('Saving profile to db...');
});

router.post('/profile/delete', (req, res) => {
  // format => req.body: {profileName: "ExampleProfile", widgetNames: ["Weather", "News" ...]}
  if (!req.body || !req.body.profileName) {
    res.status(400).send('Err: Improperly formatted profile delete request');
  }
  dbHelpers.deleteProfile(null, req.body.profileName);
  res.status(200).send('Processing delete profile from db request...');
});

router.get('/profile/loadAll', (req, res) => {
  let returnProfiles = [];
  dbHelpers.loadUserProfiles(null)
    .then((profiles) => {
      profiles.forEach((profile) => {
        returnProfiles.push({
          profile: profile.dataValues.name,
          widgets: profile.widgets.map(widget => widget.dataValues.name),
        });
        console.log(`Profile: ${profile.dataValues.name} \n`);
        profile.widgets.forEach((widget) => {
          console.log(`  -  Widget: ${widget.dataValues.name} \n`);
        });
      });
      console.log('Loaded profiles: ', returnProfiles);
      res.status(200).send(JSON.stringify(returnProfiles));
    })
    .catch((err) => {
      console.log('Error loading profiles ', err);
      res.status(500).send('Error loading profiles ', err);
    });
});

router.get('/profile/active', (req, res) => {
  dbHelpers.getActiveProfile(null)
    .then((profile) => {
      if (profile) {
        console.log(`Found active profile: ${profile.name}`);
        res.status(200).send(profile.name);
      } else {
        console.log('No active profile found');
        res.status(200).send('No active profile found');
      }
    })
    .catch((err) => {
      console.log('Error getting active profile: ', err);
      res.status(500).send(err);
    });
});

router.post('/profile/apply', (req, res) => {
  // format => profileDetails: { profile: ['widget1','widget2' ...] , slideshow: t/f }
  if (!req.body || !req.body.deviceName || !req.body.profileData) {
    console.log('Err: Improperly formatted profile apply request');
    res.status(400).send('Err: Improperly formatted profile apply request');
  }
  let { deviceName, profileData } = req.body;
  let { particleToken } = req.session;

  // Update which profile is active in the db
  dbHelpers.getActiveProfile()
    .then((profile) => {
      if (profile) {
        if (profile.name === profileData.profileName) {
          // no updates necessary if profile is already active
          console.log('Requested profile is already active');
          res.status(200).send('Requested profile is already active');
        } else {
          console.log(`Found active profile: ${profile.name}`);
          // mark old active profile inactive
          dbHelpers.changeProfileActiveState(null, profile.name, false);
          // mark new profile active
          console.log('Marking new profile active');
          dbHelpers.changeProfileActiveState(null, profileData.profileName, true);
        }
      } else {
        // if no active profile found, skip to just mark the new one active
        console.log('Marking new profile active');
        dbHelpers.changeProfileActiveState(null, profileData.profileName, true);
      }
    })
    .catch((err) => {
      console.log('Error updating active profile: ', err);
      res.status(500).send(err);
    });

  // prepare profile data to be sent to Particle function
  let particleProfileData = JSON.stringify({
    profile: profileData.profile,
    switchMode: profileData.switchMode,
  });
  console.log(particleProfileData);

  particleHelpers.callFunction(deviceName, 'setProfile', particleProfileData, particleToken)
    .then((data) => {
      if (data.body.return_value === -1) {
        console.log('Particle: Error applying profile ', data);
        res.status(500).end('Particle: Error applying profile ', JSON.stringify(data));
      } else {
        console.log('Particle: Profile applied successfully, returned ', data);
        res.status(200).end('Particle: Profile applied successfully, returned ', JSON.stringify(data));
      }
    })
    .catch((err) => {
      console.log('Particle Err: An error occurred setting profile: ', err);
      res.status(500).send('Particle Err: An error occurred setting profile: ', JSON.stringify(err));
    });
});

router.post('/profile/updateWidgets', (req, res) => {
  let { profileName, widgetName } = req.body;
  dbHelpers.updateProfileWidgets(profileName, widgetName)
    .then((result) => {
      console.log('UPDATED PROFILE', result);
      res.send(result);
    })
    .catch((err) => {
      console.log('ERROR UPDATING PROF', err);
      res.status(500).end(err);
    });
});

module.exports = router;
