const express = require('express');
const {configMonitor} = require('./controllers/configMonitor');
const connection = require('./config/database');
const { logsDao } = require('./controllers/dao');
const { eventLogs } = require('./controllers/event');


const server = express();
const port = 3000;

connection
    .authenticate()
    .then(() => {
        console.log("Connect Database");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

server.get('/logs', logsDao);
server.get('/event', eventLogs)

server.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});