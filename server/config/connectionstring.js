var keys = process.env.dbusername
  ? {
    dbusername: process.env.dbusername,
    dbpassword: process.env.dbpassword
  }
  : require('./keys');

module.exports = process.env.mongodbstring
  || `mongodb://${keys.dbusername}:${keys.dbpassword}@ds115546.mlab.com:15546/apocryphon`;
