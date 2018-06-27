const axios = require('axios');
const express = require('express');

const router = express.Router();

router.get('/api/weather', (req, res) => {
  console.log('Received weather request for ', req.body);
  const { zip } = req.body;
  axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=78738`, { params: { key: process.env.OPEN_WEATHER_MAP_API_KEY } })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
