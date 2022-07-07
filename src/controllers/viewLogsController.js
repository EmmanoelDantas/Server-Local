const connection = require('../config/database');

const viewLogsController = async (req, res) => {
    try {
        const result = await connection.query("SELECT * FROM full_log");

        return res.status(200).json({
            message: "View Catraca Carregada",
            result
        });
    
    } catch (error) {
        res.status(401).json({message: "UUID is invalid!"});
    }
   
}

module.exports = {viewLogsController};


