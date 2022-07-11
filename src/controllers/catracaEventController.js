
/**
 * Controller que faz a requisicao dos eventos da catraca.
 */
const Catra = require('../models/CatracaEventsModel');
/**
 * Funcao que faz a requisicao, usando o axios para minha catraca.
 * Porem deve se certificar que a catraca esta configurada e o monitor da mesma esta conectado
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const catracaEventController = async (req, res, next) => {
    try {
        // faz a chamada a meu ambiente de teste, ou a catraca e retorna os events
        // console.log(data.body);
    
        var name = req.body.event.name;
        /*
        * verifica o name do evento, e altera para:
        * Se name == 'TURN LEFT' altera para 'S' -> Saida
        * se name == 'TURN RIGHT' altera para 'E' -> Entrada
        */
        const date = req.body.event.time;

        const dateFormated = await formatData(JSON.parse(date));

        if(name == 'TURN LEFT'){
            name = 'S'
        } else if(name == 'TURN RIGHT') {
            name = 'E'
        }  
        // conecta um database local, ja predefinido com os models e salva os events
        const result = await Catra.create({
            event_name: name,
            time: dateFormated,
            device_id: req.body.device_id
        });

        // await connection.query("UPDATE full_log()");

        return res.status(200).json({
            message: "Event Catraca Carregados",
            result
        });
    } catch (error) {
        res.status(401).send(error);
    }

    // console.log(data)
}

function formatData (dateFormated) {

    const date = new Date(dateFormated);

    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedTime = hours + minutes.substr(-2) + seconds.substr(-2);

    return formattedTime;
}

module.exports = {catracaEventController}