const axios = require ('axios') ;

let token = '';
const env = 'dev';
const url = env === 'dev' ? 'http://localhost:3001' : 'http://192.168.0.129';


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
  
const activateMonitor = async () => {
  try {
    await axios.post(`${url}/set_configuration.fcgi?session=${token}`, {
      monitor: {
        request_timeout: '5000',
        hostname: 'localhost',
        port: '3001',
      },
    });
    console.log('Monitor ativado');
    await changeUrl();
  } catch (error) {
   
    console.log(
      '   Não foi possivel ativar o monitor de acessos, tente novamente!  \n\n'
    );
    throw new Error("Monitor nao ativado")
  }
};
  
const changeUrl = async () => {
  try {
    await axios.post(`${url}/set_configuration.fcgi?session=${token}`, {
      monitor: {
        path: '/api/notifications',
      },
    });
    console.log('URL Modificada')
  
  } catch (error) {
    console.log(
      '     Não foi possivel redirecionar o monitor, tente novamente!     \n\n'
    );
    throw new Error("Catraca nao iniciada!")
  }
};

module.exports = {startMonitorController};