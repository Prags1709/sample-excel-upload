'use strict';

/** @type {import('sequelize-cli').Migration} */

const tableName = 'user';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable( tableName, {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.STRING,
        allowNull: false
      },
      salary: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    await queryInterface.addIndex(tableName, ['name', 'age', 'salary', 'phone_number'], {
      indexName: 'user_group_index',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
