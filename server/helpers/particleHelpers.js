require('dotenv').config();
const Particle = require('particle-api-js');

let particle = new Particle();

const login = () => {
  return particle.login({
    username: process.env.PARTICLE_EMAIL,
    password: process.env.PARTICLE_PASS,
  });
};

const listDevices = (token) => {
  return particle.listDevices({
    auth: token,
  });
};

const flashDevice = (device, firmwarePath, token) => {
  return particle.flashDevice({
    deviceId: device,
    files: { firmware: firmwarePath },
    auth: token,
  });
};

const callFunction = (device, functionName, arg, token) => {
  return particle.callFunction({
    deviceId: device,
    name: functionName,
    argument: arg,
    auth: token,
  });
};

const sendEventData = (eventName, payload, token) => {
  let payloadJSON = JSON.stringify(payload);
  particle.publishEvent({ name: eventName, data: payloadJSON, auth: token })
    .then((res) => {
      if (res.body.ok) { console.log(`Particle: event published succesfully with payload: ${payloadJSON}`); }
    })
    .catch((err) => {
      console.log(`Particle: failed to publish event: ${err}`);
    });
};

module.exports = {
  login,
  listDevices,
  flashDevice,
  callFunction,
  sendEventData,
};
