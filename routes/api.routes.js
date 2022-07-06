const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller');

const {restrict} = require('../middlewares/restrict');
const {superuser} = require('../middlewares/superuser');
const {user} = require('../middlewares/user');

router.get('/api/v1/', restrict, apiController.index);
router.get('/api/v1/users/', restrict, superuser, apiController.users);
router.get('/api/v1/users/:id', restrict, user, apiController.userId);
router.get('/api/v1/rooms/:id',restrict, apiController.roomId);


module.exports = router;