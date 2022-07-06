'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rooms', 
    [
      {
        name: 'room1',
        creator_id: '1',
        player1_id: '2',
        player2_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'room2',
        creator_id: '2',
        player1_id: '3',
        player2_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'room3',
        creator_id: '2',
        player1_id: '4',
        player2_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'room4',
        creator_id: '1',
        player1_id: '2',
        player2_id: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};
