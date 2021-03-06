//IMPORTS
const Connection = require('./redis-connection');
const manipulaLista = require('./manipula-lista');


//Conection on Redis And Create a client
const redis = new Connection();

redis.create('redis', '6379', 'allowlist-refresh-token:')
redis.Client.expireAt

module.exports = {
    refreshToken: manipulaLista(redis.Client),
    connect: () => {
        redis.connect();
    }
} 