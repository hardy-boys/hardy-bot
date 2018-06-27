const axios = require('axios');
const express = require('express');

const router = express.Router();

router.get('/api/weather', (req, res) => {
  console.log('Received weather request for ', req.body);
  const { zip } = req.body;
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
  const fullURL = `${weatherURL}&zip=${zip}`;
  axios.get(fullURL)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
