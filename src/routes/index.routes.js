const express = require('express');
const { startMonitorController } = require('../controllers/startMonitorController');
const logsRouter = require('./accessLogs.routes');
const eventRouter = require('./catracaEvent.routes');

const routes = express.Router();

routes.use(startMonitorController);

routes.use(logsRouter);
routes.use(eventRouter);

module.exports = routes;