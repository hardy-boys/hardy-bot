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

router.get('/profile/loadAll', (req, res) => {
  let returnProfiles = {};
  dbHelpers.loadUserProfiles(null)
    .then((profiles) => {
      profiles.forEach((profile) => {
        returnProfiles[profile.dataValues.name] = [];
        console.log(`Profile: ${profile.dataValues.name} \n`);
        profile.widgets.forEach((widget) => {
          returnProfiles[profile.dataValues.name].push(widget.dataValues.name);
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

router.post('/profile/apply', (req, res) => {
  // format => profileDetails: { profile: ['widget1','widget2' ...] , slideshow: t/f }
  if (!req.body || !req.body.deviceName || !req.body.profileData) {
    console.log('Err: Improperly formatted profile apply request');
    res.status(400).send('Err: Improperly formatted profile apply request');
  }
  let { deviceName, profileData } = req.body;
  let { particleToken } = req.session;

  // prepare profile data to be sent to Particle function
  profileData = JSON.stringify(profileData);
  console.log(profileData);

  particleHelpers.callFunction(deviceName, 'setProfile', profileData, particleToken)
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
      res.status(500).end('Particle Err: An error occurred setting profile: ', JSON.stringify(err));
    });
});

module.exports = router;
