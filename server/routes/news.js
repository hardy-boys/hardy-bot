const axios = require('axios');
const express = require('express');

const router = express.Router();

router.get('/api/news', (req, res) => {
  console.log('Received news requests');
  axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
