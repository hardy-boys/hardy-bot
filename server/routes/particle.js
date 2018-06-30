require('dotenv').config();
const express = require('express');
const path = require('path');
const Particle = require('particle-api-js');

const router = express.Router();

let particle = new Particle();

router.get('/particle/login', (req, res) => {
  if (req.session.particleToken) {
    console.log('Already logged into Particle');
    res.status(200).end('Already logged into Particle');
  } else {
    particle.login({ username: process.env.PARTICLE_EMAIL, password: process.env.PARTICLE_PASS })
      .then((data) => {
        req.session.particleToken = data.body.access_token;
        console.log('Successfully logged into Particle cloud', req.session.particleToken);
        return particle.listDevices({ auth: req.session.particleToken });
      })
      .then((devices) => {
        console.log('Devices: ', devices);
        res.status(200).end('Login successful');
      })
      .catch((err) => {
        console.log('Could not log in.', err);
        res.status(401).end(err);
      });
  }
});

router.get('/particle/flash/:widget', (req, res) => {
  let binName = '';
  let { widget } = req.params;
  if (widget === 'weather') {
    binName = 'DateTimeWeatherWidget.bin';
  } else if (widget === 'stocks') {
    binName = 'StocksWidget.bin';
  } else {
    console.log('Err: No device firmware was found for widget: ', widget);
    res.status(404).end(`No device firmware was found for widget: ${widget}`);
    return;
  }

  let binPath = path.resolve(__dirname, '../resource/firmware', binName);
  particle.flashDevice({
    deviceId: 'savvy-fox',
    files: { firmware: binPath },
    auth: req.session.particleToken,
  })
    .then((data) => {
      console.log('Device flashing started successfully:', data, '\n', 'firmware: ', binName);
      res.status(200).end(`Flashing device firmware ${binName}...`);
    })
    .catch((err) => {
      console.log('An error occurred while flashing the device:', err);
      res.status(500).end('Error attempting to flash device firmware');
    });
});


module.exports = router;
