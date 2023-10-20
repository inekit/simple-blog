const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const tOrmCon = require('../db/connection');

passport.serializeUser(function (user, done) {
  console.log('Сериализация: ', user.id);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log('Десериализация: ', id);

  tOrmCon.then((connection) => {
    const userRep = connection.getRepository('Admin');

    userRep
      .findOne({ where: { id: id } })
      .then((user) => {
        user.isAdmin = true;
        console.log(1, user);
        return done(null, user);
      })
      .catch((e) => {
        return done(e, false);
      });
  });
});

passport.use(
  new LocalStrategy({ usernameField: 'login' }, function (login, password, done) {
    tOrmCon.then((connection) => {
      const userRep = connection.getRepository('Admin');

      userRep
        .find()
        .then(function (allUsers) {
          console.log('All users: ', allUsers);

          if (!allUsers) return done(error, false);

          for (const userN of allUsers) {
            if (login === userN.login && bcrypt.compareSync(password, userN.password)) {
              console.log('логин правильный, вы ', userN.id);

              return done(null, userN);
            }
          }

          console.log('логин неправильный');
          return done(null, false);
        })
        .catch(function (error) {
          console.log('Ошибка доступа', error);
          done(null, false);
        });
    });
  })
);

module.exports = passport;
