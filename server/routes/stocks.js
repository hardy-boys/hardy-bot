/* Data provided for free by IEX (https://iextrading.com/developer) .View IEX’s Terms of Use(https://iextrading.com/api-exhibit-a/) */

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
const appToken = process.env.STREAMDATA_STOCKS;

let pushToDevice = (payload, token) => {
  let payloadJSON = JSON.stringify(payload);
  particle.publishEvent({ name: 'stocks', data: payloadJSON, auth: token })
    .then((res) => {
      if (res.body.ok) { console.log(`Event published succesfully with payload: ${payloadJSON}`); }
    })
    .catch((err) => {
      console.log(`Failed to publish event: ${err}`);
    });
};

let mapData = (sym, input) => {
  return { Symbol: sym.toUpperCase(), Price: input[0] };
};

router.get('/api/stocks', (req, res) => {
  // hardcoded stock symbol for testing
  let symbol = 'aapl';
  let targetUrl = `https://api.iextrading.com/1.0/stock/${symbol}/price`;

  let eventSource = streamdataio.createEventSource(targetUrl, appToken);
  let result = [];

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
      result.push(data);
      console.log(result);
      pushToDevice(mapData(symbol, result), req.session.particleToken);
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
      pushToDevice(mapData(symbol, result), req.session.particleToken);
    })

    // the standard 'error' callback will be called when an error occur with the evenSource
    // for example with an invalid token provided
    .onError((error) => {
      console.log('ERROR!', error);
      eventSource.close();
    });

  eventSource.open();

  res.status(200).end('Stock polling started');
});

module.exports = router;
