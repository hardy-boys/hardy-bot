const actions = require('../../react-client/src/actions/types');

require('dotenv').config();
const express = require('express');
const Particle = require('particle-api-js');

const router = express.Router();

let particle = new Particle();

// add EventSource dependency
const streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
// add json patch dependency
const jsonPatch = require('fast-json-patch');

// appToken is the way Streamdata.io authenticates you as a valid user.
// you MUST provide a valid token for your request to go through.
const appToken = process.env.STREAMDATA_WEATHER;

let pushToDevice = (payload, token) => {
  let payloadJSON = JSON.stringify(payload);
  particle.publishEvent({ name: 'openWeather', data: payloadJSON, auth: token })
    .then((res) => {
      if (res.body.ok) { console.log(`Event published succesfully with payload: ${payloadJSON}`); }
    })
    .catch((err) => {
      console.log(`Failed to publish event: ${err}`);
    });
};

let mapData = (input) => {
  return {
    main: input.weather[0].main,
    temp: Math.round(input.main.temp),
    humidity: input.main.humidity,
    wind: input.wind.speed,

  };
};

let eventSource;
let apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;


router.get('/api/weather', (req, res) => {
  let zip = '78701';
  let targetUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${zip}&units=imperial`;

  eventSource = streamdataio.createEventSource(targetUrl, appToken);

  let result;
  const io = req.app.get('socketio');
  io.emit('action', { type: actions.WEATHER_REQUEST_RECEIVED });

  eventSource
    // the standard 'open' callback will be called when connection is established with the server
    .onOpen(() => {
      console.log('connected!');
    })
    // the streamdata.io specific 'data' event will be called when a fresh Json data set
    // is pushed by Streamdata.io coming from the API
    .onData((data) => {
      console.log('data received');
      // memorize the fresh data set
      result = data;
      io.emit('action', { type: actions.WEATHER_DATA_RECEIVED, data: result });
      console.log(result);
      pushToDevice(mapData(result), req.session.particleToken);
    })
    // the streamdata.io specific 'patch' event will be called when a fresh Json patch
    // is pushed by streamdata.io from the API. This patch has to be applied to the
    // latest data set provided.
    .onPatch((patch) => {
      // display the patch
      console.log('patch: ', patch);
      // apply the patch to data using json patch API
      jsonPatch.applyPatch(result, patch);
      console.log('RESULT', result);
      // do whatever you wish with the update data
      console.log(result);
      io.emit('action', { type: actions.WEATHER_DATA_UPDATE, data: result });
      pushToDevice(mapData(result), req.session.particleToken);
    })

    // the standard 'error' callback will be called when an error occur with the evenSource
    // for example with an invalid token provided
    .onError((error) => {
      console.log('ERROR!', error);
      eventSource.close();
      io.emit('action', { type: actions.WEATHER_REQUEST_ERROR, data: error });
    });

  eventSource.open();

  res.status(200).end('Weather polling started');
});

router.get('/api/weather/close', (req, res) => {
  eventSource.close();
  res.status(200).end('Weather polling stopped');
});

router.post('/api/weather', (req, res) => {
  eventSource.close();
  console.log('REQ', req.body);
  let { zip } = req.body;

  let targetUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${zip}&units=imperial`;

  eventSource = streamdataio.createEventSource(targetUrl, appToken);

  let result;
  const io = req.app.get('socketio');

  eventSource
    // the standard 'open' callback will be called when connection is established with the server
    .onOpen(() => {
      console.log('connected!');
    })
    // the streamdata.io specific 'data' event will be called when a fresh Json data set
    // is pushed by Streamdata.io coming from the API
    .onData((data) => {
      console.log('data received');
      // memorize the fresh data set
      result = data;
      // io.emit('action', { type: actions.WEATHER_DATA_RECEIVED, data: result });
      console.log(result);
      pushToDevice(mapData(result), req.session.particleToken);
      res.send(result);
    })
    // the streamdata.io specific 'patch' event will be called when a fresh Json patch
    // is pushed by streamdata.io from the API. This patch has to be applied to the
    // latest data set provided.
    .onPatch((patch) => {
      // display the patch
      console.log('patch: ', patch);
      // apply the patch to data using json patch API
      jsonPatch.applyPatch(result, patch);
      console.log('RESULT', result);
      // do whatever you wish with the update data
      console.log(result);
      io.emit('action', { type: actions.WEATHER_DATA_UPDATE, data: result });
      pushToDevice(mapData(result), req.session.particleToken);
    })

    // the standard 'error' callback will be called when an error occur with the evenSource
    // for example with an invalid token provided
    .onError((error) => {
      console.log('ERROR!', error);
      eventSource.close();
      io.emit('action', { type: actions.WEATHER_REQUEST_ERROR, data: error });
    });

  eventSource.open();

  // res.status(200).end('Weather polling started');
});

module.exports = router;
