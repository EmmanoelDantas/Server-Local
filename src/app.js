const express = require('express');
const connection = require('./config/database');
const routes = require('./routes/index.routes');
const viewLogsRouter = require('./routes/viewLogs.routes');

const app = express();

connection
    .authenticate()
    .then(() => {
        console.log("Connect Database");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

app.use(viewLogsRouter);
app.use(routes);

module.exports = app;
