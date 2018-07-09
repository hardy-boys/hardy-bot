const db = require('../models');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const saveMember = (email, password, zipcode, callback) => {
  let hashedPW;
  if (password) {
    const salt = bcrypt.genSaltSync(3);
    hashedPW = bcrypt.hashSync(password, salt);
  }
  db.models.User.create({
    email,
    password: hashedPW,
    zipcode,
  })
    .then((result) => {
      callback(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

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
  saveMember,
  saveProfile,
  getUserDevices,
};
