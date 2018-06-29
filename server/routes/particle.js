require('dotenv').config();
const express = require('express');
const Particle = require('particle-api-js');

const router = express.Router();

let particle = new Particle();

router.get('/particle/login', (req, res) => {
  particle.login({ username: process.env.PARTICLE_EMAIL, password: process.env.PARTICLE_PASS })
    .then((data) => {
      req.session.particleToken = data.body.access_token;
      console.log('Successfully logged into Particle cloud', req.session.particleToken);
      return particle.listDevices({ auth: req.session.particleToken });
    })
    .then((devices) => {
      console.log('Devices: ', devices);
      res.status(200).send('Login successful');
    })
    .catch((err) => {
      console.log('Could not log in.', err);
      res.status(401).send(err);
    });
});

module.exports = router;
