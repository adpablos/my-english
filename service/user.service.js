const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    } else{
        const err = new Error();
        err.message = 'Username or password is incorrect';
        err.statusCode = 401;
        throw err;
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    console.log("userParam.username:" + userParam.username);
    // validate
    if(await User.findOne({ username: userParam.username })){
        const err = new Error();
        err.message = 'Username "' + userParam.username + '" is already taken';
        err.statusCode = 409;
        throw err;
    }

    // hash password
    if (userParam.password) {
        console.log("hashing password");
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    console.log("Creating user");
    // save user
    return User.create(userParam);
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}