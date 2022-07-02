//IMPORTS
const Connection = require('./redis-connection');
const manipulaLista = require('./manipula-lista');



//Conection on Redis And Create a client
const redis = new Connection();

redis.create('redis', '6379', 'redefinicao-de-senha:')
redis.Client.expireAt

module.exports = {
    redefinicaoDeSenha: manipulaLista(redis.Client),
    connect: () => {
        redis.connect();
    }
} 