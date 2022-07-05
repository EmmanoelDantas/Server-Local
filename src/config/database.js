const Sequelize = require('sequelize');

const connection = new Sequelize('catraca_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;