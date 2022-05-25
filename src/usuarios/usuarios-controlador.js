const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');
const jwt = require('jsonwebtoken');
const blacklist = require('../../redis/manipula-blacklist');
const allowlistRefreshToken = require('../../redis/allowlist-refresh-token')

const crypto = require('crypto')
const moment = require('moment')

function criaTokenJWT(usuario) {
  // const cincoDiasEmMilissegundos = 432000000;
  const payload = {
    id: usuario.id,
    // expriraEm: Date.now() + cincoDiasEmMilissegundos 
  };

  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m'});
  return token;
}

async function criaTokenOpaco(usuario){
  const tokenOpaco = crypto.randomBytes(24).toString('hex');
  const dataExpiracao = moment().add(5, 'd').unix();
  await allowlistRefreshToken.adiciona(tokenOpaco, usuario.id, dataExpiracao);
  return tokenOpaco;
}

module.exports = {
  async adiciona (req, res) {
    const { nome, email, senha } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email,
      });

      await usuario.adicionaSenha(senha);

      await usuario.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  async login(req, res) {
    try {
      const accesToken = criaTokenJWT(req.user);
      const refreshToken = await criaTokenOpaco(req.user);
      res.set('Authorization', accesToken);
      res.status(200).send({refreshToken});
    } catch(erro) {
      res.status(500).json({ erro: erro.message})
    }
  },

  async logout(req, res) {
    try {
      const token = req.token;
      await blacklist.adiciona(token);
      res.status(204).send();
    } catch(erro) {
      res.status(500).json({ erro: erro.message })
    }
  },

  async lista(req, res) {
    try {
      const usuarios = await Usuario.lista();
      res.json(usuarios);
    } catch(erro) {
      res.status(500).json({erro: erro.message})
    }
  },

  async deleta(req, res) {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
