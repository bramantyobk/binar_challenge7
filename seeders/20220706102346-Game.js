'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Games', 
    [
      {
        roomid: '1',
        player1: 'B-K-B',
        player2: 'G-K-B',
        sp1: '1',
        sp2: '-1',
        result1: 'WON',
        result2: 'LOSE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roomid: '2',
        player1: 'B-K-B',
        player2: 'G-K-B',
        sp1: '1',
        sp2: '-1',
        result1: 'WON',
        result2: 'LOSE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roomid: '3',
        player1: 'G-K-B',
        player2: 'B-K-B',
        sp1: '-1',
        sp2: '1',
        result1: 'LOSE',
        result2: 'WON',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roomid: '4',
        player1: 'B-K-B',
        player2: 'G-K-B',
        sp1: '1',
        sp2: '-1',
        result1: 'WON',
        result2: 'LOSE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Games', null, {});
  }
};
