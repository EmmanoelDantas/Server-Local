const express = require('express');
const {getSession} = require('./controllers/index');
const connection = require('./config/database');

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

server.get('/', getSession);

server.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});