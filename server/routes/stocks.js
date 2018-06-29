require('dotenv').config();
const express = require('express');
const Particle = require('particle-api-js');

const router = express.Router();

let particle = new Particle();

// add EventSource dependency
const streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
// add json patch dependency
const jsonPatch = require('fast-json-patch');

// targetUrl is the JSON API you wish to stream
// you can use this example API which simulates updating stocks prices from a financial market
const targetUrl = 'http://stockmarket.streamdata.io/prices';

// appToken is the way Streamdata.io authenticates you as a valid user.
// you MUST provide a valid token for your request to go through.
const appToken = process.env.STREAMDATA;

let pushToDevice = (updates, token) => {
  particle.publishEvent({ name: 'test', data: JSON.stringify(updates), auth: token })
    .then((res) => {
      if (res.body.ok) { console.log('Event published succesfully'); }
    })
    .catch((err) => {
      console.log(`Failed to publish event: ${err}`);
    });
};

router.get('/api/stocks', (req, res) => {
  let eventSource = streamdataio.createEventSource(targetUrl, appToken);
  let result;

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
      console.log(result);
      let devData = data.map((el) => {
        return { title: el.title, price: el.price };
      });
      pushToDevice(devData, req.session.particleToken);
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
      let devData = patch.map((el) => {
        return { title: el.path, price: el.value };
      });
      pushToDevice(devData, req.session.particleToken);
    })

    // the standard 'error' callback will be called when an error occur with the evenSource
    // for example with an invalid token provided
    .onError((error) => {
      console.log('ERROR!', error);
      eventSource.close();
    });

  eventSource.open();

  res.status(200).end('stocks endpoint reached');
});

module.exports = router;
