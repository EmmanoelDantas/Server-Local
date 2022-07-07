/**
 * Configuracoes de database - usando sequelize ORM
 */
const Sequelize = require('sequelize');
/**
 * Cria uma conexao com o minha database local..
 * OBS: no ambiente de producao, usamos o mysql do xampp e criamos um banco de dados
 * chamado catraca_db. Mas pode criar esse banco em qualquer framwork MYSQL
 */
const connection = new Sequelize('catraca_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;