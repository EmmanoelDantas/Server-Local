const express = require('express');
const {getSession} = require('./config-catraca-cades/index');

const server = express();
const port = 3000;

server.get('/', getSession);

server.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});