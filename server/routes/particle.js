require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const particleHelpers = require('../helpers/particleHelpers.js');

const router = express.Router();

router.get('/particle/login', (req, res) => {
  let { particleToken } = req.session;

  if (particleToken) {
    console.log('Already logged into Particle');
    res.status(200).end('Already logged into Particle');
  } else {
    particleHelpers.login()
      .then((data) => {
        particleToken = data.body.access_token;
        // Save particle cloud token to req.session
        req.session.particleToken = particleToken;
        console.log('Particle: Successfully logged into Particle cloud', particleToken);
        return particleHelpers.listDevices(particleToken);
      })
      .then((devices) => {
        console.log('Devices: ', devices);
        res.status(200).end('Particle: Login successful');
      })
      .catch((err) => {
        console.log('Particle: Could not log in.', err);
        res.status(401).end(err);
      });
  }
});

router.post('/particle/flash', (req, res) => {
  let { deviceName } = req.body;
  let { particleToken } = req.session;

  if (!req.body || !deviceName) {
    res.status(400).send('Particle Err: Improperly formatted flash request');
  }
  // Hardcoded to WidgetLoader firmware for now
  let binPath = path.resolve(__dirname, '../resource/firmware', 'WidgetLoader.bin');
  particleHelpers.flashDevice(deviceName, binPath, particleToken)
    .then((data) => {
      console.log('Particle: Started flashing WidgetLoader.bin...');
      res.status(200).end('Particle: Started flashing WidgetLoader.bin...');
    })
    .catch((err) => {
      console.log('Particle Err: An error occurred while flashing the device:', err);
      res.status(500).end('Particle Err: Error attempting to flash device firmware', err);
    });
});

router.post('/particle/view', (req, res) => {
  // endpoint for testing new widget views
  let { deviceName, widgetID } = req.body;
  let { particleToken } = req.session;

  if (!req.body || !deviceName) {
    res.status(400).send('Err: Improperly formatted flash request');
  }
  console.log(widgetID);
  particleHelpers.callFunction(deviceName, 'changeView', widgetID, particleToken)
    .then((data) => {
      console.log('Particle: Function called succesfully, returned ', data);
      res.status(200).end('Particle: Function called succesfully, returned ', data);
    })
    .catch((err) => {
      console.log('Particle Err: An error occurred calling widget change view: ', err);
      res.status(500).end('Particle Err: An error occurred calling widget change view: ', err);
    });
});

router.post('/particle/stats', (req, res) => {
  let { deviceName } = req.body;
  let { particleToken } = req.session;

  if (!req.body || !deviceName) {
    res.status(400).send('Err: Invalid device name or request body');
  }

  let diagnosticUrl = `https://api.particle.io/v1/diagnostics/${deviceName}/last?access_token=${particleToken}`;
  axios.get(diagnosticUrl)
    .then((result) => {
      console.log('Particle: Diagnostic lookup returned ', result.data);
      res.status(200).end(JSON.stringify(result.data));
    })
    .catch((err) => {
      console.log('Particle Err: An error occurred looking up diagnostics ', err);
      res.status(500).end('Particle Err: An error occurred looking up diagnostics ', err);
    });
});


module.exports = router;
