const { User } = require('../models');

const register = (req, res) => {
    User.register(req.body)
        .then((user) => {
            res.status(200).json({
                message: "Register berhasil silahkan login"
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Registrasi gagal, silakan coba lagi"
            })
        })
}

const login = (req, res) => {
    User.authenticate(req.body)
        .then(user => {
            dataUser = {
                id: user.id,
                username: user.username,
                token: user.generateToken()
            }
            res.status(200).json(dataUser);
        })
        .catch(error => {
            res.status(500).json({
                error: error.message,
                message: "Login gagal, silakan coba lagi"
            });
        })
};



const whoami = (req, res) => {
    res.status(200).json({
        id: req.user.dataValues.id,
        username: req.user.dataValues.username
    });
}

const logout = (req, res) => {
    res.status(200).json({
        message: "logout"
    });
};

module.exports = {
    register,
    login,
    whoami,
    logout,
};