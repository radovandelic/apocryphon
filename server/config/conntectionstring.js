var keys = process.env.dbusername
  ? {
      dbusername: process.env.dbusername,
      dbpassword: process.env.dbusername
    }
  : require('.keys');

module.exports = `mongodb://${keys.dbusername}:${keys.dbpassword}@ds115546.mlab.com:15546/apocryphon`;
