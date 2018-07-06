const db = require('../models');
const sequelize = require('sequelize');

const saveProfile = (userId, profileName, widgetNames) => {
  // TODO: implement userId filtering
  console.log('DB: saving profile ', profileName);
  db.models.Profile.findOrCreate({
    where: {
      name: profileName,
    },
  })
    .then((profile) => {
      widgetNames.forEach((widgetName) => {
        db.models.Widget.findOne({
          attributes: ['id'],
          where: { name: widgetName },
        })
          .then((widget) => {
            widget.addProfile(profile[0]);
          });
      });
    })
    .catch((err) => {
      console.log('Error saving profile ', err);
    });
};

const loadUserProfiles = (userId, profileName) => {
  db.models.Profile.findAll({
    where: {
      name: profileName,
      attributes: ['id'],
    },
  })
    .then((profile) => {
      // do stuff
    })
    .catch((err) => {
      console.log('Error saving profile ', err);
    });
};

const saveWeatherWidgetConfig = (userId, widgetName, zipcode) => {
  return db.models.Widget.findOne({
    where: {
      name: widgetName,
    },
  })
    .then((widget) => {
      let zip = { 0: zipcode };
      return widget.addUser(userId, {
        through: { configuration: JSON.stringify(zip) },
      })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
    });
};

const getUserDevices = (userId) => {
  return db.models.User.findOne({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      // console.log('USER RETRIEVED', user);
      return user;
    });
};


module.exports = {
  saveProfile,
  loadUserProfiles,
  saveWeatherWidgetConfig,
  getUserDevices,
};
