'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.belongsTo(models.Room, {
        foreignKey: 'roomid',
        onDelete: 'CASCADE'
      })
    }
  };
  Game.init({
    roomid: DataTypes.INTEGER,
    player1: DataTypes.STRING,
    player2: DataTypes.STRING,
    sp1: DataTypes.INTEGER,
    sp2: DataTypes.INTEGER,
    result1: DataTypes.STRING,
    result2: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};