require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const Particle = require('particle-api-js');
const actions = require('../../react-client/src/actions/types');
const particleHelpers = require('../helpers/particleHelpers.js');

let particle = new Particle();

const router = express.Router();

router.get('/particle/login', (req, res) => {
  let { particleToken } = req.session;

  if (particleToken) {
    console.log('Already logged into Particle');
    return particleHelpers.listDevices(particleToken)
      .then((devices) => {
        res.send(devices.body);
      });
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
        console.log('Devices: ', devices.body);
        res.send(devices.body);
      })
      .catch((err) => {
        console.log('Particle: Could not log in.', err);
        res.send(err);
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

  const io = req.app.get('socketio');

  if (!req.body || !deviceName) {
    res.status(400).send('Err: Invalid device name or request body');
  }

  // Subscribe to future Particle device status events
  particle.getEventStream({ deviceId: deviceName, name: 'spark/status', auth: particleToken })
    .then((stream) => {
      stream.on('event', (data) => {
        console.log('Particle status event: ', data);
        io.emit('action', { type: actions.DEVICE_STATUS_UPDATE, payload: { deviceName, data } });
      });
    });

  particle.getEventStream({ deviceId: deviceName, name: 'spark/device/diagnostics/update', auth: particleToken })
    .then((stream) => {
      stream.on('event', (data) => {
        console.log('Particle diagnostics event: ', data);
        io.emit('action', { type: actions.DEVICE_DIAGNOSTICS_UPDATE, payload: { deviceName, data } });
      });
    });

  // request latest devices status to send back to client
  let updateDiagnosticUrl = `https://api.particle.io/v1/diagnostics/${deviceName}/update?access_token=${particleToken}`;
  let lastDiagnosticUrl = `https://api.particle.io/v1/diagnostics/${deviceName}/last?access_token=${particleToken}`;
  axios({
    method: 'post',
    url: updateDiagnosticUrl,
    timeout: 3000,
  })
    .then(() => {
      axios.get(lastDiagnosticUrl)
        .then((lastStatus) => {
          let lastData = lastStatus.data;
          lastData.status = 'online'; // add a custom parameter to indicate device is online
          console.log('Particle: Last diagnostic request returned ', lastData);
          res.status(200).end(JSON.stringify(lastData));
        })
        .catch((nextErr) => {
          console.log('Particle Err: Last diagnostic request returned ', nextErr);
          res.status(500).end(JSON.stringify(nextErr));
        });
    })
    .catch((err) => {
      if (err.code && err.code === 'ECONNABORTED') {
        console.log('Particle: Device is unreachable, getting last status');
        axios.get(lastDiagnosticUrl)
          .then((lastStatus) => {
            let lastData = lastStatus.data;
            lastData.status = 'offline'; // add a custom parameter to indicate device is offline
            console.log('Particle: Last diagnostic request returned ', lastData);
            res.status(200).end(JSON.stringify(lastData));
          })
          .catch((nextErr) => {
            console.log('Particle Err: Last diagnostic request returned ', nextErr);
            res.status(500).end(JSON.stringify(nextErr));
          });
      } else {
        res.status(err.response.status).end(`Particle Err: An error occurred requesting diagnostics update: 
        ${JSON.stringify(err.response.data)}`);
      }
    });
});


module.exports = router;
