
const { Sequelize } = require('sequelize');
const connection = require('../config/database');

const Logs = connection.define('access_logs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    device_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    enviado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
});

Logs.sync({force: false}).then(()=>{
    console.log('Create Table')
})

module.exports = Logs;