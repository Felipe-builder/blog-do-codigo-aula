const jwt = require('jsonwebtoken')
const { createHash } = require('crypto');
const Connection = require('./redis-connection');
const manipulaLista = require('./manipula-lista');


const redis = new Connection();
redis.create('redis', '6379', 'blocklist-access-token:');
const manipulaBlocklist = manipulaLista(redis.Client);



function geraTokenHash(token) {
    return createHash('sha256')
        .update(token)
        .digest('hex');
}

module.exports = {
    adiciona: async token => {
        const dataExpiracao = jwt.decode(token).exp;
        const tokenHash = geraTokenHash(token)
        await manipulaBlocklist.adiciona(tokenHash, '', dataExpiracao)
    },
    contemToken: async token => {
        const tokenHash = geraTokenHash(token)
        return manipulaBlocklist.contemChave(tokenHash);
    },
    redisConnect: () => {
        redis.connect();
    }
}