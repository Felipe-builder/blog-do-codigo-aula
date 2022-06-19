const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const blocklist = require('./redis/blocklist-access-token');
const allowlist = require('./redis/allowlist-refresh-token');

const { estrategiasAutenticacao } = require('./src/usuarios');

app.use(bodyParser.json())

allowlist.connect()
blocklist.redisConnect()


module.exports = app;
