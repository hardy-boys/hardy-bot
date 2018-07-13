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
const appToken = process.env.STREAMDATA_TRAFFIC;

let mapParticle = (input) => {
  return {
    Distance: `${Math.round(input.resourceSets[0].resources[0].travelDistance)} mi`,
    TrafficTime: `${Math.round(input.resourceSets[0].resources[0].travelDurationTraffic / 60)} min`,
  };
};

let eventSource;
let apiKey = process.env.BING_MAPS_API_KEY;

router.post('/api/traffic', (req, res) => {
  let { origin, destination } = req.body;
  // remove certain characters to match expected URL parameter format
  origin = origin.replace(/\s+/g, '%20');
  origin = origin.replace(/#/g, '');
  destination = destination.replace(/\s+/g, '%20');
  destination = destination.replace(/#/g, '');

  let targetUrl = `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${origin}&waypoint.2=${destination}
  &optimize=timeWithTraffic&routeAttributes=routeSummariesOnly&maxSolutions=1&distanceUnit=mi&key=${apiKey}`;

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
      res.send(data);
      // memorize the fresh data set
      result = data;
      console.log(result);
      // io.emit('action', { type: actions.TRAFFIC_DATA_RECEIVED, data: result });
      particleHelpers.sendEventData('traffic', mapParticle(result), req.session.particleToken);
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
      console.log('RESULT', result);
      // res.send(result);
      let data = result.resourceSets[0].resources[0];
      io.emit('action', { type: actions.TRAFFIC_DATA_UPDATE, payload: data });
      particleHelpers.sendEventData('traffic', mapParticle(result), req.session.particleToken);
    })

    // the standard 'error' callback will be called when an error occur with the evenSource
    // for example with an invalid token provided
    .onError((error) => {
      console.log('ERROR!', error);
      res.send(error);
      eventSource.close();
      // io.emit('action', { type: actions.TRAFFIC_REQUEST_ERROR, data: error });
    });

  eventSource.open();

  // res.status(200).end('TRAFFIC polling started');
});

router.get('/api/traffic/close', (req, res) => {
  eventSource.close();
  res.status(200).end('TRAFFIC polling stopped');
});

router.post('/widgets/traffic/save', (req, res) => {
  const { userId, widgetName, zipcode } = req.body;
  // dbHelpers.saveTrafficWidgetConfig(userId, widgetName, zipcode)
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((error) => {
  //     res.send(error);
  //   });
});

module.exports = router;
