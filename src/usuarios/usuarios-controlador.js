const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');

const tokens = require('./tokens');
const { EmailVerificacao } = require('./emails')

const { ConversorUsuario } = require('../conversores');

function geraEndereco(rota, token) {
  const baseURL = process.env.BASE_URL;
  return `${baseURL}${rota}${token}`;
}
 
module.exports = {
  async adiciona (req, res, next) {
    const { nome, email, senha, cargo } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email,
        emailVerificado: false,
        cargo
      });

      await usuario.adicionaSenha(senha);
      await usuario.adiciona();

      const token = tokens.verificacaoEmail.cria(usuario.id);
      const endereco = geraEndereco('/usuario/verifica_email/', token);
      const emailVerificacao = new EmailVerificacao(usuario, endereco);
      emailVerificacao.enviaEmail().catch(console.log);

      res.status(201).json();
    } catch (erro) {
      next(erro);
    }
  },

  async login(req, res, next) {
    try {
      const accesToken = tokens.access.cria(req.user.id);
      const refreshToken = await tokens.refresh.cria(req.user.id);
      res.set('Authorization', accesToken);
      res.status(200).send({refreshToken});
    } catch(erro) {
      next(erro)
    }
  },

  async logout(req, res, next) {
    try {
      const token = req.token;
      await tokens.access.invalida(token);
      res.status(204).send();
    } catch(erro) {
      next(erro)
    }
  },

  async lista(req, res, next) {
    try {
      const usuarios = await Usuario.lista();
      const conversor = new ConversorUsuario(
        'json',
        req.acesso.todos.permitido ? req.acesso.todos.atributos : req.acesso.apenasSeu.atributos
      );
      res.send(conversor.converter(usuarios));
    } catch(erro) {
      next(erro)
    }
  },

  async verificaEmail(req, res, next) {
    try {
      const usuario = req.user;
      await usuario.verificaEmail();
      res.status(200).json();
    } catch(erro) {
      next(erro)
    }
  },

  async deleta(req, res, next) {
    try {
      const usuario = await Usuario.buscaPorId(req.params.id);
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      next(erro)
    }
  }
};
