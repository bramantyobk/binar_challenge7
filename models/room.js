'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasMany(models.Game, {
        foreignKey: {
          name: 'roomid'
        }
      }),
      Room.belongsTo(models.User, {
        foreignKey: {
          name: 'player1_id'
        }
      }),
      Room.belongsTo(models.User, {
        foreignKey: {
          name: 'player2_id'
        }
      })
    }
  };

  Room.init({
    name: DataTypes.STRING,
    creator_id: DataTypes.STRING,
    player1_id: DataTypes.INTEGER,
    player2_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};