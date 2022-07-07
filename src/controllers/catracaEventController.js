
/**
 * Controller que faz a requisicao dos eventos da catraca.
 */
const { default: axios } = require("axios");
const Catra = require('../models/CatracaEventsModel');
/**
 * Configuracoes de host da catraca. Em ambiente de teste ele vai usar um localhost
 */
const env = 'dev';
const url = env === 'dev' ? 'http://localhost:3001' : '';
/**
 * Funcao que faz a requisicao, usando o axios para minha catraca.
 * Porem deve se certificar que a catraca esta configurada e o monitor da mesma esta conectado
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const catracaEventController = async (req, res) => {
    try {
        // faz a chamada a meu ambiente de teste, ou a catraca e retorna os events
        const {data} = await axios.post(`${url}/api/notifications/event`)
        // console.log(data.body);
    
        var name = data.body.event.name;
        /*
        * verifica o name do evento, e altera para:
        * Se name == 'TURN LEFT' altera para 'S' -> Saida
        * se name == 'TURN RIGHT' altera para 'E' -> Entrada
        */
        if(name == 'TURN LEFT'){
            name = 'S'
        } else if(name == 'TURN RIGHT') {
            name = 'E'
        }  
        // conecta um database local, ja predefinido com os models e salva os events
        const result = await Catra.create({
            event_name: name,
            time: data.body.event.time,
            device_id: data.body.device_id
        })

        return res.status(200).json({
            message: "Event Catraca Carregados",
            result
        });
    } catch (error) {
        res.status(401).json({message: "UUID is invalid!"});
    }
    

    // console.log(data)
}

module.exports = {catracaEventController}