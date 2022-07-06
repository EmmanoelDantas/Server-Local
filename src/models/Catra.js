const { Sequelize } = require('sequelize');
const connection = require('../config/database');

const Catra = connection.define('catra_event', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        alowNull: false
    },
    event_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    device_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Catra.sync({force: false}).then(() => {
    console.log('Create table')
})

module.exports = Catra;