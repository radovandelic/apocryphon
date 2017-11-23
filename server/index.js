import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import userRoutes from './api/users/routes';
import passport from 'passport';
var session = require('client-sessions');
var User = require('./api/users/model');

let app = express();
app.server = http.createServer(app);

// Passport Congfig
//require('./config/passport')(passport);
// logger
app.use(morgan('dev'));

//this is for cookied sessions
app.use(
  session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
  })
);

//The password might be encrypted in the session,
// but that’s still no reason to leave it in the cookie. Go ahead and delete it!
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user; //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

app.use(express.static('build'));

// app.use("/", express.static("build"));

// connect to db
initializeDb(db => {
  // internal middleware
  app.use(middleware({ config, db }));

  // api router
  app.use('/user', api({ config, db }));

  app.use(function(req, res) {
    res.statusCode = 404;
    res.send("Page doesn't exist");
  });

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;
