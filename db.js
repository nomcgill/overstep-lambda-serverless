const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = (Database) => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  if (Database === 'example'){
      console.log('=> using new database connection');
      return mongoose.connect(process.env.DB, { useUnifiedTopology: true })
        .then(db => { 
          isConnected = db.connections[0].readyState;
        });
  }
  if (Database === 'database'){
      console.log('=> using new database connection');
      return mongoose.connect(process.env.DATABASEDB, { useUnifiedTopology: true })
        .then(db => { 
          isConnected = db.connections[0].readyState;
        });
  }
};