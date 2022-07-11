/**
 * Controller que faz a requisicao dos logs de acesso da catraca.
 */
const connection = require("../config/database");
const Logs = require('../models/AccessLogsModel');
/**
 * Configuracoes de host da catraca. Em ambiente de teste ele vai usar um localhost
 */
const env = 'dev';
const url = env === 'dev' ? 'http://localhost:3001' : ''; // Esse ultimo host deve ser substituido pelo host da catraca

/**
 * Funcao que faz a requisicao, usando o axios para minha catraca.
 * Porem deve se certificar que a catraca esta configurada e o monitor da mesma esta conectado
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const accessLogsController = async (req, res) => {
    try {
        // const {data} = req.body;
        // conecta um database local, ja predefinido com os models e salva os acess logs
        // const idArray = [''];
        // const ids = data.object_changes[0].values.id;
        const date = req.body.object_changes[0].values.time;

        const dateFormated = await formatData(JSON.parse(date));

        // for (var i = 0; i< ids.length; i++) {
        //     idArray.push(ids[i].id);//adicinando o id no array, conforme a posição
        // }

        const result = await Logs.create({
            id: req.body.object_changes[0].values.id,
            time: dateFormated,
            device_id: req.body.device_id,
            user_id: req.body.object_changes[0].values.user_id
        },
        );

        const retorno = await connection.query('SELECT * FROM access_logs');
        // const arr = JSON.parse(retorno)
        // console.log(arr);

        var newArrayDataOfOjbect = Object.values(retorno)
        // console.log(newArrayDataOfOjbect);
        const arrId = [];

        // for (var i = 0; i< newArrayDataOfOjbect.length; i++) {
        //      arrId.push(newArrayDataOfOjbect[i].id);//adicinando o id no array, conforme a posição
        // }

        newArrayDataOfOjbect[0].forEach((a) => {
            // console.log(a.id);
            arrId.push(a.id)
        })

        // console.log(arrId);

        await updateLogs(arrId);


        return res.status(200).send({
            message: "Loads Carregados",
            result
        })
    } catch (error) {
        res.status(401).send(error);
    }  
}

// funcao pra atualizar os logs com base em um array de ids
// esse array de ids necessita ser de ints
function updateLogs (ids) {
    if (ids.lenght == 0) {
        throw "Array is empty";
    }
    try {
        ids.forEach(e => {
            Logs.update({ enviado: true }, {
                where: {
                    id: e
                }
            }) 
        });
    } catch (error) {
        console.error(error);
    }
}

function formatData (dateFormated) {

    const date = new Date(dateFormated);

    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedTime = hours + minutes.substr(-2) + seconds.substr(-2);

    return formattedTime;
}

module.exports = {accessLogsController}