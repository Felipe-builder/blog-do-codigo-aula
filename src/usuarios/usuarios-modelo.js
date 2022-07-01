//Imports
const bcrypt = require('bcrypt');
const usuariosDao = require('./usuarios-dao');
const { InvalidArgumentError, NotFoundError } = require('../erros');
const validacoes = require('../validacoes-comuns');


/**
 * A classe Usuario é reponsável por gerenciar todas as opreações relacionadas a usuários
 */
class Usuario {
  /**
   * O construtor rece os dados de um usuário e os atribui a instância atual
   * @param {object} usuario 
   */
  constructor(usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senhaHash = usuario.senhaHash;
    this.emailVerificado = usuario.emailVerificado,
    this.cargo = usuario.cargo
    this.valida();
  }

  /**
   * Este método adiciona um usuário
   * @throws {InvalidArgumentError} - Esse erro ocorre quando um usuário com o mesmo e-mail já está cadastrado
   */
  async adiciona() {
    if (await usuariosDao.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    await usuariosDao.adiciona(this);
    const {id} = await usuariosDao.buscaPorEmail(this.email);
    this.id = id;
  }

  /**
   * Adiciona senha validando o tamanho mínimo e máximo e que não seja nulo. E transforma em um Hash.
   * @param {string} senha 
   */
  async adicionaSenha(senha) {
    validacoes.campoStringNaoNulo(senha, 'senha');
    validacoes.campoTamanhoMinimo(senha, 'senha', 8);
    validacoes.campoTamanhoMaximo(senha, 'senha', 64);
    this.senhaHash = await Usuario.gerarSenhaHash(senha);
  }

  /**
   * Valida os campos de email, nome e cargo
   * @throws {InvalidArgumentError} - Se o campo de cargo não corresponder com um dos disponíveis ['admin', 'editor', 'assinante']
   */
  valida() {
    validacoes.campoStringNaoNulo(this.nome, 'nome');
    validacoes.campoStringNaoNulo(this.email, 'email');
    const cargosValidos = ['admin', 'editor', 'assinante']

    if (cargosValidos.indexOf(this.cargo) === -1) {
      throw new InvalidArgumentError('O campo cargo está inválido')
    }
  }

  /**
   * Verifica o email para tornar a conta válida.
   */
  async verificaEmail() {
    this.emailVerificado = true;
    await usuariosDao.modificaEmailVerificado(this, this.emailVerificado)
  }
  
  /**
   * Deleta o usuário
   * @returns 
   */
  async deleta() {
    return usuariosDao.deleta(this);
  }
  
  /**
   * Realiza uma busca de um usuário no DB através do ID
   * @param {number} id 
   * @throws {NotFoundError} - Caso não encontrado o usuário com base no 'id'
   * @returns {object} Usuario
   */
  static async buscaPorId(id) {
    const usuario = await usuariosDao.buscaPorId(id);
    if (!usuario) {
      throw new NotFoundError('usuario');
    }
    
    return new Usuario(usuario);
  }
  
  /**
   * Realiza uma busca de um usuário no Database através do email
   * @param {string} email 
   * @throws {NotFoundError} - Caso não encontrado o usuário com base no 'email'
   * @returns {object} Usuario
   */
  static async buscaPorEmail(email) {
    const usuario = await usuariosDao.buscaPorEmail(email);
    if (!usuario) {
      throw new NotFoundError('usuario');
    }
    
    return new Usuario(usuario);
  }

  /**
   * Realzia uma busca no Database por todos os usuários
   * @returns {[object]} lista de Usuario
   */
  static lista() {
    return usuariosDao.lista();
  }

  /**
   * Transforma a senha do usuário em um hash para posteriormente inserir no Database
   * @param {string} senha 
   * @returns {string} hashSenha
   */
  static gerarSenhaHash(senha) {
    const custoHash = 12;
    return bcrypt.hash(senha, custoHash)
  }

}

module.exports = Usuario;
