const { Sequelize } = require('sequelize');
const connection = require('../config/database');

const Catra = connction.define('catra_event', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        alowNull: false
    },
    event_name: {
        type: Sequelize.toString,
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

Catra.syncr({force: false}).then(() => {
    console.log('Create table')
})

module.exports = Catra;