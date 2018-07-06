/* Data provided for free by IEX (https://iextrading.com/developer) .View IEX’s Terms of Use(https://iextrading.com/api-exhibit-a/) */
const actions = require('../../react-client/src/actions/types');
const particleHelpers = require('../helpers/particleHelpers.js');

require('dotenv').config();
const express = require('express');

const router = express.Router();

// add EventSource dependency
const streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
// add json patch dependency
const jsonPatch = require('fast-json-patch');

// appToken is the way Streamdata.io authenticates you as a valid user.
// you MUST provide a valid token for your request to go through.
const appToken = process.env.STREAMDATA_STOCKS;

let mapParticle = (symbols) => {
  return Object.keys(symbols).map((symbol) => {
    return {
      Symbol: symbol,
      Price: String(symbols[symbol].quote.latestPrice),
    };
  });
};

let eventSource;

router.post('/api/stocks', (req, res) => {
  console.log('REQUEST', req.body);
  // hardcoded stock symbol for testing
  let stockSymbols = req.body.symbols.join(',');
  let targetUrl = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockSymbols}&types=quote`;

  eventSource = streamdataio.createEventSource(targetUrl, appToken);
  let result;
  const io = req.app.get('socketio');
  // io.emit('action', { type: actions.STOCK_REQUEST_RECEIVED });

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
      particleHelpers.sendEventData('stocks', mapParticle(data), req.session.particleToken);
      // io.emit('action', { type: actions.STOCK_DATA_RECEIVED, data: { data } });
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
      // pushToDevice(mapData(symbol, result), req.session.particleToken);
      const data = result;
      // res.send(data);
      particleHelpers.sendEventData('stocks', mapParticle(data), req.session.particleToken);
      io.emit('action', { type: actions.STOCK_DATA_UPDATE, data: { data } });
    })

    // the standard 'error' callback will be called when an error occur with the evenSource
    // for example with an invalid token provided
    .onError((error) => {
      console.log('ERROR!', error);
      res.send(error);
      eventSource.close();
    });

  eventSource.open();

  // res.status(200).end('Stock polling started');
});

router.get('/api/stocks/close', (req, res) => {
  eventSource.close();
  res.status(200).end('Stock polling stopped');
});

// router.post('/api/stocks', (req, res) => {
//   eventSource.close();
//   let { symbol } = req.body;

//   let targetUrl = `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote`;

//   eventSource = streamdataio.createEventSource(targetUrl, appToken);

//   let result;
//   const io = req.app.get('socketio');

//   eventSource
//     // the standard 'open' callback will be called when connection is established with the server
//     .onOpen(() => {
//       console.log('connected!');
//     })
//     // the streamdata.io specific 'data' event will be called when a fresh Json data set
//     // is pushed by Streamdata.io coming from the API
//     .onData((data) => {
//       console.log('data received');
//       // memorize the fresh data set
//       result = data;
//       // io.emit('action', { type: actions.WEATHER_DATA_RECEIVED, data: result });
//       console.log(result);
//       // pushToDevice(mapData(result), req.session.particleToken);
//       res.send(result);
//     })
//     // the streamdata.io specific 'patch' event will be called when a fresh Json patch
//     // is pushed by streamdata.io from the API. This patch has to be applied to the
//     // latest data set provided.
//     .onPatch((patch) => {
//       // display the patch
//       console.log('patch: ', patch);
//       // apply the patch to data using json patch API
//       jsonPatch.applyPatch(result, patch);
//       console.log('RESULT', result);
//       // do whatever you wish with the update data
//       // console.log(result);
//       const data = result;
//       io.emit('action', { type: actions.STOCK_DATA_UPDATE, data: { data } });
//       // pushToDevice(mapData(result), req.session.particleToken);
//     })

//     // the standard 'error' callback will be called when an error occur with the evenSource
//     // for example with an invalid token provided
//     .onError((error) => {
//       console.log('ERROR!', error);
//       eventSource.close();
//       io.emit('action', { type: actions.STOCK_REQUEST_ERROR, data: error });
//     });

//   eventSource.open();

//   // res.status(200).end('Weather polling started');
// });

module.exports = router;
