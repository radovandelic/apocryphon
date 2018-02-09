import cors from 'cors';
import config from '../../config.json';
var router = require('express').Router();
var User = require('./model');
var bcrypt = require('bcrypt');
//var session = require('client-sessions');
//var passport = require('passport');// 3rd party middleware

var origins = ['http://localhost:8080', 'http://localhost:3000', 'http://localhost', 'https://localhost',
  'philarios.ml', 'www.philarios.ml',
  'http://philarios.ml', 'http://www.philarios.ml',
  'https://philarios.gq', 'https://www.philarios.gq',
  'http://philarios.gq', 'http://www.philarios.gq']

/*router.use(
  cors({
    origin: '*',
    /*credentials: true,
    exposedHeaders: config.corsHeaders
  })
);*/

// C //
router.post('/create', (req, res) => {
  var user = req.body;
  console.log(req.body);
  if (user.email && user.password) {
    bcrypt.hash(user.password, 8, (err, hash) => {
      if (err) {
        res.status(500).json(err);
      } else {
        user.password = hash;
        User.create(user)
          .then(user => {
            user.password = undefined;
            //req.session.user = user;
            res.status(200).json(user);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    });
  }
});

// R //
router.get('/:id', requireLogin, (req, res) => {
  if (req.session.user.id != req.params.id) {
    return res.status(500).json({ text: "Illegal action" });
  }
  User.findOne({ _id: req.session.user.id }, (err, user) => {
    console.log(err || user)
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(user);
    }
  });
});

// U //
router.post('/:id/update', requireLogin, (req, res) => {
  if (req.session.user.id != req.params.id) {
    return res.status(500).json({ text: "Illegal action" });
  }
  var user = req.body;
  if (user.password) {
    bcrypt.hash(user.password, 8, (err, hash) => {
      if (err) {
        res.status(500).json(err);
      } else {
        user.password = hash;
        User.update({ _id: req.params.id }, { $set: user }, (err, response) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(response);
          }
        });
      }
    });
  } else {
    User.update({ _id: req.params.id }, { $set: user }, (err, user) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(user);
      }
    });
  }
});

// D //
router.delete('/:id/delete', requireLogin, (req, res) => {
  console.log(req.session);
  User.remove({ _id: req.session.user.id }, err => {
    if (err) res.status(500).json(err);
    else res.status(200).json({ status: 'success' });
  });
});

// login //
router.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then(result => {
            if (result) {
              user.password = undefined;
              //req.session.user = user;

              //console.log(req.session);
              //console.log(user);
              res.status(200).json(user);
            } else
              res
                .status(404)
                .json({ status: 'email/password combo not found' });
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(404).json({ status: 'email/password combo not found' });
      }
    }
  });
});

router.post('/logout', (req, res) => {
  //console.log('this is sesson', req.session.user);
  //console.log('this is req.user', req.user);
  //req.session.reset();

  res.status(200).json('you have logged out');
});

router.post("/guest/create", (req, res) => {
  req.session.user = req.body;
  req.session.user.guest = true;
  res.status(200).json(req.session.user);
})

router.post("/updateprogress/:stage/:level", (req, res) => {
  if (req.body) {
    var stage = req.params.stage;
    var level = req.params.level;
    req.session.user[stage] = [];
    req.session.user[stage][level] = req.body.words;
    if (!req.body.guest) {
      User.update({ _id: req.params.id }, { $set: req.body }, (err, response) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(response);
        }
      });
    } else {
      res.status(200).json(req.session.user);
    }
  }
})

router.get("/getprogress/:stage/:level", (req, res) => {
  var stage = req.params.stage;
  var level = req.params.level;
  if (!req.session.user[stage] && req.session.user[level]) res.status(404).json({ text: "Not found" });
  else {
    res.status(200).json(req.session.user[stage][level]);
  }
})

const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.session && req.session.user) return next();
  // if they aren't redirect them to the home page
  res.status(404).json({ status: 'Your are not logged in.' });
}

function requireLogin(req, res, next) {
  if (!req.session) {
    res.status(404).json({ status: 'Your are not logged in.' });
  } else {
    next();
  }
}

module.exports = router;
