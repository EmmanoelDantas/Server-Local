const express = require('express');
const { accessLogsController } = require('../controllers/accessLogsController');

const logsRouter = express.Router();

logsRouter.get('/access-logs', accessLogsController);

module.exports = logsRouter;