const db = require('../models');
const sequelize = require('sequelize');

const saveProfile = (profileName, widgetNames) => {
  db.models.Profile.findOrCreate({
    where: {
      name: profileName,
    },
  })
  // db.models.Profile.create({
  //   name: profileName,
  // })
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
  getUserDevices,
};
