const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

const {restrict} = require('../middlewares/restrict')

router.post('/api/v1/auth/register', authController.register);
router.post('/api/v1/auth/login', authController.login);
router.get('/api/v1/auth/whoami', restrict, authController.whoami);
router.post('/api/v1/auth/logout', restrict, authController.logout);


module.exports = router;