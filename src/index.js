const express = require('express');
const getSession = require('./config-catraca-cades/index');

const server = express();
const port = 3000;

server.use(getSession);

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});