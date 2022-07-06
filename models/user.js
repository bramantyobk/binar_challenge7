'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Room, {
        foreignKey: {
          name: 'player1_id'
        }
      }),
      User.hasMany(models.Room, {
        foreignKey: {
          name: 'player2_id'
        }
      })
  }

    // method encrypt
    static encrypt = (password) => bcrypt.hashSync(password, 10);


    // method register
    static register = ({username,password}) => {
      const encryptedPassword = this.encrypt(password);

      return this.create({
        username,
        password: encryptedPassword
      })
    }

    // checking the password input by user
    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    // authenticating username and password input by user
    static authenticate = async ({username,password}) => {
      try {
        const user = await this.findOne({where: {username}});

        if (!user) {
          console.log("user tidak ditemukan");
          return Promise.reject("User not found");
        }
        console.log("user ditemukan");

        const isPasswordValid = user.checkPassword(password);

        if (!isPasswordValid) {
          console.log("pwd tidak ditemukan");

          return Promise.reject("Wrong password");
        }
        console.log("pwd ditemukan")

        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error.message);
      }
    };

    generateToken = () => {
      console.log(this.username);
      const payload = {
        id: this.id,
        username: this.username
      }
      const secretKey = "psst jangan bilang ke orang lain";

      let token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

      return token
    };
  };

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};