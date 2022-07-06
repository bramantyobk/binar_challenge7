const { User } = require('../models');
const { Room } = require('../models');
const { Game } = require('../models');

const index = (req, res) => {
    res.status(200).json({message: "welcome to home API"});
};

const users = async (req, res) => {
    await User.findAll({
        include: { all: true, nested: true }
    })
    .then ((data) => {
        console.log(data);
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(500).json(err.message)
    })
};

const userId = async (req, res) => {
    await User.findByPk(req.params.id, {
        include: { all: true, nested: true }
    })
    .then ((data) => {
        console.log(data);
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(500).json(err.message)
    })
};

const roomId = async (req, res) => {
    await Room.findByPk(req.params.id, {
        include: { all: true, nested: true }
    })
    .then ((data) => {
        console.log(data);
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(500).json(err.message)
    })
}
module.exports = {
    userId,
    index,
    roomId,
    users
};