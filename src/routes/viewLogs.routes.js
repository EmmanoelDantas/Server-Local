const express = require('express');
const { viewLogsController } = require('../controllers/viewLogsController');

const viewLogsRouter = express.Router();

viewLogsRouter.post('/view-logs', viewLogsController);

module.exports = viewLogsRouter;