const { default: axios } = require("axios");
const Catra = require('../models/Catra');
const env = 'dev';
const url = env === 'dev' ? 'http://localhost:3001' : '';

const eventLogs = async () => {
    const {data} = await axios.post(`${url}/api/notifications/event`)
    // console.log(data.body);

    await Catra.create({
        type: data.body.event.type,
        event_name: data.body.event.name,
        time: data.body.event.time,
        device_id: data.body.device_id
    })

    // console.log(data)
}

module.exports = {eventLogs}