const passport = require('passport');
const db = require('../database/models/index');
const dbHelpers = require('../database/controllers/dbHelpers');
const bcrypt = require('node-bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


//
// ─── LOCAL STRATEGY ─────────────────────────────────────────────────────────────
//
exports.passportHelper = () => {
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    ((req, username, password, done) => {
      console.log('REQUEST', req.body);
      // Only create new user if the email hasn't been used
      db.models.User.findOne({ where: { email: username } })
        .then((foundUser) => {
          if (!foundUser) {
            dbHelpers.saveMember(username, password, req.body.zip, (userToSave) => {
              done(null, userToSave.dataValues);
            });
          } else {
            done('error');
          }
        });
    }),
  ));

  passport.use('local-login', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    ((req, username, password, done) => {
      db.models.User.findOne({ where: { email: username } })
        .then((foundUser) => {
          if (foundUser) {
            bcrypt.compare(password, foundUser.dataValues.password)
              .then((valid) => {
                console.log('VALID PASSWORD', valid);
                if (valid) {
                  done(null, foundUser.dataValues);
                }
              })
              .catch(console.log);
          }
        });
    }),
  ));

  passport.serializeUser((user, done) => {
    console.log('SERIALIZE USER\n', user);
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    console.log('DESERIALIZE USER\n');
    done(null, obj);
  });
};
