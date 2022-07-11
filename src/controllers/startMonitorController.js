/**
 * Controller que realiza a configuracao e inicia o servico monitor
 */
const axios = require ('axios') ;
/**
 * Configuracoes de host da catraca. Em ambiente de teste ele vai usar um localhost
 */
let token = '';
const env = 'dev';
const url = env === 'dev' ? 'http://localhost:3001' : 'http://192.168.0.129';

/**
* Funcao que con figura a catraca automaticamente, passando o login de acesso da catraca e retornando o session.
* Porem deve se certificar que a catraca esta configurada e o monitor da mesma esta conectado
* @param {*} req 
* @param {*} res 
* @param {*} next 
* @returns 
*/
const startMonitorController = async (req, res, next) => {
  
  try {
    const { data } = await axios.post(`${url}/login.fcgi`, {
      login: 'admin',
      password: 'admin',
    });
  
    token = data.session;
    console.log('Iniciando Sessao');
    await activateMonitor();
    next();
  } catch (error) {
      
    console.log(
    'computador conectado na mesma rede que a catraca e tente novamente!\n\n'
    );
    return res.status(401).json({message: "Fail"})
  }
};

/**
 * Funcao para ativar meu servico de monitor, quando passo meu login e gera uma session. essa session vai chamar minha funcao de ativar o monitor
 * Que faz um post axios, na host da minha catraca
 */
const activateMonitor = async () => {
  try {
    await axios.post(`${url}/set_configuration.fcgi?session=${token}`, {
      monitor: {
        request_timeout: '5000',
        hostname: 'localhost',
        port: '3001',
        path: '/api/notifications'
      },
    });
    console.log('Monitor ativado');
  } catch (error) {
   
    console.log(
      '   Não foi possivel ativar o monitor de acessos, tente novamente!  \n\n'
    );
    throw new Error("Monitor nao ativado")
  }
};
/**
 * Essa funcao e iniciada, quando se ativa o monitor. Ela simplesmente muda a url, para conseguirmos fazer as requisicoes para o monitor
 */


module.exports = {startMonitorController};