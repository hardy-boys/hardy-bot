const express = require('express');
const dbHelpers = require('../../database/controllers/dbHelpers');
const particleHelpers = require('../helpers/particleHelpers.js');

const router = express.Router();

router.post('/profile/save', (req, res) => {
  // format => req.body: {profileName: "ExampleProfile", widgetNames: ["Weather", "News" ...]}
  if (!req.body || !req.body.profileName || !req.body.widgetNames) {
    res.status(400).send('Err: Improperly formatted profile save request');
  }
  dbHelpers.saveProfile(req.body.profileName, req.body.widgetNames);
  res.status(201).send('Saving profile to db...');
});

router.get('/profile/loadAll', (req, res) => {
  dbHelpers.loadUserProfiles();
  res.status(200).send('OK');
});

router.post('/profile/apply', (req, res) => {
  let { deviceName, profileID } = req.body;
  let { particleToken } = req.session;

  if (!req.body || !req.body.profileName || !req.body.widgetNames) {
    res.status(400).send('Err: Improperly formatted profile apply request');
  }
  particleHelpers.callFunction(deviceName, 'setProfile', profileID, particleToken)
    .then((data) => {
      console.log('Particle: Profile applied successfully, returned ', data);
      res.status(200).end('Particle: Profile applied successfully, returned ', data);
    })
    .catch((err) => {
      console.log('Particle Err: An error occurred setting profile: ', err);
      res.status(500).end('Particle Err: An error occurred setting profile: ', err);
    });
});

module.exports = router;
