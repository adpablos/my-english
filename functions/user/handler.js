'use strict';

require('dotenv').config({path: '../../variables.env'});
const userService = require('../../service/user.service');

module.exports.userAuthenticate = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

module.exports.userCreate = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports.userGetAll = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

module.exports.userGetCurrent = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports.userGetById = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports.userUpdate = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports.userDelete = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}