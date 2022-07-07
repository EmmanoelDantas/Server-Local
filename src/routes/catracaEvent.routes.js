const express = require('express');
const { catracaEventController } = require('../controllers/catracaEventController');

const eventRouter = express.Router();

eventRouter.get('/event-catraca', catracaEventController);

module.exports = eventRouter;