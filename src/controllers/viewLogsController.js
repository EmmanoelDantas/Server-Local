const connection = require('../config/database');
// const Logs = require('../models/AccessLogsModel');

const viewLogsController = async (req, res) => {
    try {
        // await connection.query("CREATE OR REPLACE VIEW full_log(log_id, user_id, time, device_id, event_name, send) AS SELECT access_logs.id as id, access_logs.user_id as user_id, access_logs.time as time, access_logs.device_id as device_id, catra_events.event_name as event_name, access_logs.enviado as send FROM access_logs INNER JOIN catra_events on catra_events.time = access_logs.time AND catra_events.device_id = access_logs.device_id;");
        
        const result = await connection.query("SELECT * FROM full_log");
        
        return res.status(200).json({
            message: "View Catraca Carregada",
            result
        });
    
    } catch (error) {
        res.status(401).json({message: "Invalid Connection"});
    }
   
}


module.exports = {viewLogsController};


