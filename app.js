//IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const blocklist = require('./redis/blocklist-access-token');
const allowlist = require('./redis/allowlist-refresh-token');
const redefinicaoDeSenha = require('./redis/listaRedefinicaoDeSenha');
const { estrategiasAutenticacao } = require('./src/usuarios');
const helmet = require('helmet')


const app = express();
app.use(bodyParser.json())

app.use(helmet())
app.disable('x-powered-by')


//Redis Connect
allowlist.connect();
blocklist.redisConnect();
redefinicaoDeSenha.connect();

module.exports = app;
