const axios = require('axios');
const express = require('express');

// add EventSource dependency
const streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
const AuthStrategy = require('streamdataio-js-sdk-auth');
// add json patch dependency
const jsonPatch = require('fast-json-patch');
const print = require('node-print');

const router = express.Router();

router.get('/api/news', (req, res) => {
  // console.log('Received news requests');
  // axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  res.status(200).end('news endpoint reached');
});

module.exports = router;
