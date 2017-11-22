var mongoose = require('mongoose');
var connectingString = require('./connectionstring');

module.exports = {
  database: connectingString,
  startDB: () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(connectingString, { useMongoClient: true });

    var db = mongoose.connection;

    db.once('open', () => {
      console.log('connected to mongodb');
    });

    db.on('error', error => {
      console.log(error);
    });
  }
};
