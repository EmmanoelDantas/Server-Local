const express = require('express');
const { catracaEventController } = require('../controllers/catracaEventController');

const eventRouter = express.Router();

eventRouter.post('/api/notifications/event', catracaEventController);

module.exports = eventRouter;