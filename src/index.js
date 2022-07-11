const express = require('express');
const app = require('./app');
const bodyParser = require('body-parser');

const server = express();
const port = 3000;

server.use(bodyParser.json());

server.use(app);

server.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});