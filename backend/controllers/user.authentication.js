const passport = require('../passport/passport');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const usersService = require('../services/admins.service');

function loginLocal(req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      console.log('Укажите правильный email или пароль!');
      return res.status(403).send(JSON.stringify({ isAutenticated: false }));
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.send(JSON.stringify({ isAutenticated: true }));
    });
  })(req, res, next);
}

function registerLocal(req, res) {
  if (!req.body.password || !req.body.login) return res.status(403).send({ error: 'no data' });

  let password = bcrypt.hashSync(req.body.password, salt);
  const user = { login: req.body.login, password };

  usersService
    .addUser(user)
    .then((userData) => res.send({ isRegistered: true }))
    .catch((err) => res.status(403).send(JSON.stringify({ isRegistered: false, err })));
}

function editUser(req, res) {
  if (!req.body.password || !req.body.login) return res.status(403).send({ error: 'no data' });

  let password = bcrypt.hashSync(req.body.password, salt);
  const user = {
    id: req.session.passport.user.toString(),
    login: req.body.login,
    password,
  };

  usersService
    .editUser(user)
    .then((userData) => res.send({ isRegistered: true }))
    .catch((err) => res.status(403).send(JSON.stringify({ isRegistered: false })));
}

const auth = (req, res, next) => {
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(403).send(JSON.stringify({ isAutenticated: false }));
  }
};

const authAdmin = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(403).send(JSON.stringify({ isAutenticated: false }));
  }
};

module.exports = {
  login: {
    local: loginLocal,
  },
  register: { local: registerLocal },
  auth,
  authAdmin,
  editUser,
};
