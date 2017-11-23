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

let app = express();
app.server = http.createServer(app);

// Passport Congfig
//require('./config/passport')(passport);
// logger
app.use(morgan('dev'));

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
