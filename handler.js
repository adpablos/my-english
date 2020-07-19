'use strict';

require('dotenv').config({ path: './variables.env' });

const connectToDatabase = require('./db');
const Word = require('./models/Word');
const wr = require('wordreference-api');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Word.create(JSON.parse(event.body))
        .then(word => callback(null, {
          statusCode: 200,
          body: JSON.stringify(word)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the word.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Word.findById(event.pathParameters.id)
        .then(word => callback(null, {
          statusCode: 200,
          body: JSON.stringify(word)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the word.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Word.find()
        .then(words => callback(null, {
          statusCode: 200,
          body: JSON.stringify(words)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the words.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Word.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(word => callback(null, {
          statusCode: 200,
          body: JSON.stringify(word)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the words.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Word.findByIdAndRemove(event.pathParameters.id)
        .then(word => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed word with id: ' + word._id, word: word })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the words.'
        }));
    });
};

module.exports.wrSearch = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            let body = JSON.parse(event.body);
            wr(body.word,body.from,body.to).then((result)=> callback(null, {
                statusCode: 200,
                body: JSON.stringify({ message: 'Translation of ' + body.word + ' from ' + body.from + ' to ' + body.to, result: result })
            }));
        });
};