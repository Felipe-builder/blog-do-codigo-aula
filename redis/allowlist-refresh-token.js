const redis = require('redis')
const manipulaLista = require('./manipula-lista')

const allowlist = redis.createClient({
    host: 'redis',
    port: '6379',
    prefix: 'allowlist-refresh-token:',
    legacyMode: true
})

async function redisConnect(){
    redis.on("error", (error) => {
        console.log(error);
    });
    await redis.connect();       
};  

module.exports = manipulaLista(allowlist);