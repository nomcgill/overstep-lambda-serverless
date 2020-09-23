'use strict';
require('dotenv').config({ path: './variables.env' });
require('dotenv').config({ path: './heroes.env'})
require('dotenv').config({ path: './database.env'})


const connectToDatabase = require('./db');
const Note = require('./models/Note');
const Database = require('./models/Database');
const Heroes = require('./models/Heroes');

// https://hackernoon.com/building-a-serverless-rest-api-with-node-js-and-mongodb-2e0ed0638f47

// EXAMPLE EXAMPLE EXAMPLE EXAMPLE EXAMPLE EXAMPLE EXAMPLE EXAMPLE
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase("example")
    .then(() => {
      Note.create(JSON.parse(event.body))
        .then(note => callback(null, {
          statusCode: 200,
          body: JSON.stringify(note)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the note.'
        }));
    });
  };

// DATABASE API BELOW //////////////////////////////////////////

  // GETALL DATABASE
  module.exports.getDatabase = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    connectToDatabase("database")
      .then(() => {
        Database.find()
          .then(notes => callback(null, {
            headers: {
              "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
            },
            statusCode: 200,
            body: JSON.stringify(notes)
          }))
          .catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the notes.'
          }))
      });
  };

// POST DATABASE
module.exports.createDatabase = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase("database")
    .then(() => {
      Database.create(JSON.parse(event.body))
        .then(note => callback(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers" : "Content-Type",
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
          },
          statusCode: 200,
          body: JSON.stringify(note)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the note.'
        }));
    });
};


//UPDATE DATABASE BY ID
module.exports.updateDatabase = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase("database")
    .then(() => {
      Database.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(note => callback(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          statusCode: 200,
          body: JSON.stringify(note)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }));
    });
};

// DELETE from Database by ID
module.exports.deleteFromDatabase = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase("database")
    .then(() => {
      Database.findByIdAndRemove(event.pathParameters.id)
        .then(note => callback(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed note with id: ' + note._id, note: note })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }));
    });
};


// HEROES API BELOW ////////////////////////////////////////////////////////////

// PUT. Find Hero by ID and update
module.exports.saveHeroById = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase("heroes")
    .then(() => {
      Heroes.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(note => callback(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          statusCode: 200,
          body: JSON.stringify(note)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }));
    });
};

// GET one Hero by ID
module.exports.findHero = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase("heroes")
    .then(() => {
      Heroes.findById(event.pathParameters.id)
        .then(note => callback(null, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            statusCode: 200,
            body: JSON.stringify(note)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the note.'
        }));
    });
};

// POST. Save one hero.
module.exports.createHero = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase("heroes")
    .then(() => {
      Heroes.create(JSON.parse(event.body))
        .then(note => callback(null, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
            },
            statusCode: 200,
            body: JSON.stringify(note)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the note.'
        }));
    });
};