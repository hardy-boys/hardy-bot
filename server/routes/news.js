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

const appToken = process.env.STREAMDATA_NEWS;

let mapParticle = (input) => {
  let articles = input.articles.slice(0, 8).map(el => el.title);
  return {
    articles,
  };
};

let eventSource;
let apiKey = process.env.NEWS_API_KEY;

router.post('/api/news', (req, res) => {
  let { searchTerm } = req.body;
  let targetUrl = `http://newsapi.org/v2/top-headlines?q=${searchTerm}&language=en&apiKey=${apiKey}`;

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
      particleHelpers.sendEventData('news', mapParticle(result), req.session.particleToken);
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
      io.emit('action', { type: actions.NEWS_DATA_UPDATE, payload: result.articles });
      particleHelpers.sendEventData('news', mapParticle(result), req.session.particleToken);
    })

    // the standard 'error' callback will be called when an error occur with the evenSource
    // for example with an invalid token provided
    .onError((error) => {
      console.log('ERROR!', error);
      res.status(500).end(error);
      eventSource.close();
    });

  eventSource.open();
});

router.get('/api/news/close', (req, res) => {
  eventSource.close();
  res.status(200).end('News polling stopped');
});

module.exports = router;
