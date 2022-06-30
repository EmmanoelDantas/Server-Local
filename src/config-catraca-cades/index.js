const axios = require ('axios') ;

let token = '';
const env = 'prod';
const url = env === 'dev' ? 'http://localhost:3000' : 'http://192.168.0.129';

const getSession = async () => {
    try {
        const {data} = await axios.post(`${url}/login.fcgi`, {
            login: 'admin',
            password: 'admin'
        });

        token = data.session;

        setTimeout(() => {
            console.log(
                'Iniciando conexao com a catraca...'
            );
            loadLogs();
        }, 1000)
    } catch (error) {
        setTimeout(()=> {
            console.log(
                'falha na conexao com a catraca, verifique o token de acesso'
            )
            setTimeout(() => {}, 5000);
        }, 500);
    }
}


const loadLogs = async () => {
    try {
        await axios.post(`${url}/load_objects.fcgi?session=${token}`, {
            object: 'access_logs'
        });

        setTimeout(()=>{
            console.log(
                'Iniciando carregamento dos logs de acesso'
            )
        }, 1000)
    } catch (error) {
        setTimeout(()=> {
            console.log(
                'falha no carregamentos dos logs'
            )
            setTimeout(() => {}, 5000);
        }, 500);
    }
}
console.log(
    'CATRACA CPI - CADES INFORGENESES',
  '-------------------------------------------------------------------\n\n'
);
setTimeout(() => {
    getSession();
}, 1000);
// module.exports = getSession;