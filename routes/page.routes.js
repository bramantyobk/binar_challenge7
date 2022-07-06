const express = require('express');
const router = express.Router();
const db = require('../models/index');



router.get('/', (req, res) => {
    res.render('home');
})

router.get('/game', (req, res) => {
    res.render('game');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/user-dashboard', (req, res) => {
    res.render('dashboard/userDashboard');
})

router.get('/user-profile', (req, res) => {
    res.render('dashboard/userProfile');
})

router.get('/edit-profile', (req, res) => {
    res.render('dashboard/editProfile');
})

router.get('/admin-dashboard', (req, res) => {
    res.render('dashboard/adminDashboard');
})

router.get('/create-room', (req, res) => {
    res.render('dashboard/createRoom');
})

router.get('/join-room', (req, res) => {
    res.render('dashboard/joinRoom');
})


module.exports = router;