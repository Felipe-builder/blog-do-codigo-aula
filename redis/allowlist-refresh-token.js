const redis = require('redis')
const manipulaLista = require('./manipula-lista')

const allowlist = redis.createClient({
    host: 'redis',
    port: '6379',
    prefix: 'allowlist-refresh-token:'
})
module.exports = manipulaLista(allowlist);