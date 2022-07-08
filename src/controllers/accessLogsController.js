/**
 * Controller que faz a requisicao dos logs de acesso da catraca.
 */
const { default: axios } = require("axios");
const Logs = require('../models/AccessLogsModel')
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
        // faz a chamada a meu ambiente de teste, ou a catraca e retorna os logs de acessos
        const {data} = await axios.post(`${url}/api/notifications/dao`)

        console.log(data.body.device_id);

        // conecta um database local, ja predefinido com os models e salva os acess logs
        const result = await Logs.create({
            id: data.body.object_changes[0].values.id,
            time: data.body.object_changes[0].values.time,
            device_id: data.body.device_id,
            user_id: data.body.object_changes[0].values.user_id,
            enviado: true
        });

        return res.status(200).send({
            message: "Loads Carregados",
            result
        })
    } catch (error) {
        res.status(401).json({message: "UUID is invalid!"});
    }  
}

// funcao pra atualizar os logs com base em um array de ids
// esse array de ids necessita ser de ints
const updateLogs = async (ids) => {
    if (ids.lenght == 0) {
        throw "Array is empty";
    }
    try {
        ids.forEach(e => {
            await Logs.update({ enviado: true }, {
                where: {
                    id: e
                }
            }) 
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {accessLogsController}