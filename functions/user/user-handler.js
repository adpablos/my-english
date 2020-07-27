'use strict';

require('dotenv').config({path: './variables.env'});
const userService = require('../../service/user.service');
const connectToDatabase = require('../../_helpers/db');
const lambdaAuth = require('../../_helpers/lambda-authorizer-jwt');

module.exports.userAuthenticate = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase()
        .then(() => {
            userService.authenticate(JSON.parse(event.body))
                .then(user => callback(null, {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "https://master.d1v5hx0ohw6l91.amplifyapp.com",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    body: JSON.stringify(user)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(err)
                }));
        });
}

module.exports.userCreate = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase()
        .then(() => {
            userService.create(JSON.parse(event.body))
                .then(user => callback(null, {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "https://master.d1v5hx0ohw6l91.amplifyapp.com",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    body: JSON.stringify(user)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(err)
                }));
        });
}

module.exports.userGetAll = (event, context, callback) => {
    let token = lambdaAuth.extractTokenFromHeader(event) || '';
    console.log("Token:" + token);
    lambdaAuth.validateToken(token, callback);
    context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase()
        .then(() => {
            userService.getAll()
                .then(user => callback(null, {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "https://master.d1v5hx0ohw6l91.amplifyapp.com",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    body: JSON.stringify(user)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(err)
                }));
        });
}

module.exports.userGetById = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase()
        .then(() => {
            userService.getById(event.pathParameters.id)
                .then(user => callback(null, {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "https://master.d1v5hx0ohw6l91.amplifyapp.com",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    body: JSON.stringify(user)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(err)
                }));
        });
}

module.exports.userUpdate = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase()
        .then(() => {
            userService.update(event.pathParameters.id, JSON.parse(event.body))
                .then(user => callback(null, {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "https://master.d1v5hx0ohw6l91.amplifyapp.com",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    body: JSON.stringify(user)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(err)
                }));
        });
}

module.exports.userDelete = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase()
        .then(() => {
            userService.delete(event.pathParameters.id)
                .then(user => callback(null, {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "https://master.d1v5hx0ohw6l91.amplifyapp.com",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    body: JSON.stringify(user)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(err)
                }));
        });
}