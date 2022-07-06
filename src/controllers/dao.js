const { default: axios } = require("axios");
const Logs = require('../models/Logs')

const dados = '';
const env = 'dev';
const url = env === 'dev' ? 'http://localhost:3001' : 'http://192.168.0.129';

const logsDao = async () => {
    const {data} = await axios.post(`${url}/api/notifications/dao`)

    console.log(data.body.device_id);

    await Logs.create({
        id: data.body.object_changes[0].values.id,
        time: data.body.object_changes[0].values.time,
        device_id: data.body.device_id,
        user_id: data.body.object_changes[0].values.user_id,
        enviado: true
    })
    
}

module.exports = {logsDao}