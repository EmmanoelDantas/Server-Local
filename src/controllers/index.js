const axios = require ('axios') ;
const Logs = require('../models/Logs');

let token = '';
let dados = '';
const env = 'dev';
const url = env === 'dev' ? 'http://localhost:3001' : 'http://192.168.0.129';


const getSession = async () => {
  
    try {
      const { data } = await axios.post(`${url}/login.fcgi`, {
        login: 'admin',
        password: 'admin',
      });
  
      token = data.session;
      activateMonitor();
    } catch (error) {
      
        console.log(
          'computador conectado na mesma rede que a catraca e tente novamente!\n\n'
        );
        
    }
  };
  
  const activateMonitor = async () => {
    try {
        console.log(token)
      await axios.post(`${url}/set_configuration.fcgi?session=${token}`, {
        monitor: {
          request_timeout: '5000',
          hostname: 'localhost',
          port: '3001',
        },
      });
      console.log('Monitor ativado');
        changeUrl();
    } catch (error) {
   
        console.log(
          '   Não foi possivel ativar o monitor de acessos, tente novamente!  \n\n'
        );
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
    }
  };

module.exports = {getSession};