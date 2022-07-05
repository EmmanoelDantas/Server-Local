
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
    event: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    device_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    identifier_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    portal_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    identification_rule_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    qrcode_value: {
        type: Sequelize.STRING,
        allowNull: false
    },
    card_value: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    detection_confidence: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mask: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    log_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

Logs.sync({force: false}).then(()=>{
    console.log('Create Table')
})

module.exports = Logs;