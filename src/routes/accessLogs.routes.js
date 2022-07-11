const express = require('express');
const { accessLogsController } = require('../controllers/accessLogsController');

const logsRouter = express.Router();

logsRouter.post('/api/notifications/dao', accessLogsController);

module.exports = logsRouter;