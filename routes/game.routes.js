const express = require('express');
const router = express.Router();

const gameController = require('../controllers/game.controller');

const {restrict} = require('../middlewares/restrict')

router.post('/api/v1/auth/create-room', restrict, gameController.createRoom);
router.post('/api/v1/join-room/:id', restrict, gameController.joinRoom);
router.post('/api/v1/fight/:id', restrict, gameController.playGame);


module.exports = router;