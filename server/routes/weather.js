const actions = require('../../react-client/src/actions/types');
const particleHelpers = require('../helpers/particleHelpers.js');
const dbHelpers = require('../../database/controllers/dbHelpers');

require('dotenv').config();
const express = require('express');

const router = express.Router();

// add EventSource dependency
const streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
// add json patch dependency
const jsonPatch = require('fast-json-patch');

// appToken is the way Streamdata.io authenticates you as a valid user.
// you MUST provide a valid token for your request to go through.
const appToken = process.env.STREAMDATA_WEATHER;

let mapParticle = (input) => {
  return {
    name: input.name,
    main: input.weather[0].main,
    temp: Math.round(input.main.temp),
    humidity: input.main.humidity,
    wind: input.wind.speed,
  };
};

let eventSource;
let apiKey = 'AIzaSyDfOdhXWVTuCeP2nP_44kS8_UHb3wRXWyI';


router.post('/api/weather', (req, res) => {
  let { zip } = req.body;
  let targetUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${zip}&units=imperial`;

  eventSource = streamdataio.createEventSource(targetUrl, appToken);

  let result;
  const io = req.app.get('socketio');
  // io.emit('action', { type: actions.WEATHER_REQUEST_RECEIVED });

  eventSource
    // the standard 'open' callback will be called when connection is established with the server
    .onOpen(() => {
      console.log('connected!');
    })
    // the streamdata.io specific 'data' event will be called when a fresh Json data set
    // is pushed by Streamdata.io coming from the API
    .onData((data) => {
      console.log('data received');
      res.send(data);
      // memorize the fresh data set
      result = data;
      console.log(result);
      // io.emit('action', { type: actions.WEATHER_DATA_RECEIVED, data: result });
      particleHelpers.sendEventData('openWeather', mapParticle(result), req.session.particleToken);
    })
    // the streamdata.io specific 'patch' event will be called when a fresh Json patch
    // is pushed by streamdata.io from the API. This patch has to be applied to the
    // latest data set provided.
    .onPatch((patch) => {
      // display the patch
      console.log('patch: ', patch);
      // apply the patch to data using json patch API
      jsonPatch.applyPatch(result, patch);
      // do whatever you wish with the update data
      console.log(result);
      // res.send(result);
      io.emit('action', { type: actions.WEATHER_DATA_UPDATE, payload: result });
      particleHelpers.sendEventData('openWeather', mapParticle(result), req.session.particleToken);
    })

    // the standard 'error' callback will be called when an error occur with the evenSource
    // for example with an invalid token provided
    .onError((error) => {
      console.log('ERROR!', error);
      res.send(error);
      eventSource.close();
      // io.emit('action', { type: actions.WEATHER_REQUEST_ERROR, data: error });
    });

  eventSource.open();

  // res.status(200).end('Weather polling started');
});

router.get('/api/weather/close', (req, res) => {
  eventSource.close();
  res.status(200).end('Weather polling stopped');
});

router.post('/widgets/weather/save', (req, res) => {
  const { userId, widgetName, zipcode } = req.body;
  dbHelpers.saveWeatherWidgetConfig(userId, widgetName, zipcode)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
