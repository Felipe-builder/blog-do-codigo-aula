//IMPORTS
const Post = require('./posts-modelo');
const { InvalidArgumentError } = require('../erros');
const { ConversorPost } = require('../conversores')
const { EmailPostCriado } = require('../usuarios/emails');


module.exports = {
  async adiciona(req, res) {
    try {
      const dadosPost = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        autor: req.user.id
      }
      let post = new Post(dadosPost);
      await post.adiciona();
      const emailPostCriado = new EmailPostCriado(req.user, post.titulo);
      await emailPostCriado.enviaEmail().catch(console.log);
      res.status(201).send(post);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(400).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  async lista(req, res) {
    try {
      let posts = await Post.listarTodos();
      const conversor = new ConversorPost('json', req.acesso.todos.permitido ? req.acesso.todos.atributos : req.acesso.apenasSeu.atributos)
      if (!req.estaAutenticado) {
        posts = posts.map(post => {
          post.conteudo = post.conteudo.substr(0, 10) + '... Você precisa assinar o blog para ler o restante do post'
          return post;
        })
      }
      res.send(conversor.converter(posts));
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  },

  async obterDetalhes (req, res) {
    try {
      const post = await Post.buscaPorId(req.params.id, req.user.id)
      res.json(post)
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  },

  async remover (req, res) {
    try {
      let post
      if (req.acesso.todos.permitido === true) {
        post = await Post.buscaPorId(req.params.id)
      } else if (req.acesso.apenasSeu.permitido === true) {
        post = await Post.buscaPorIdAutor(req.params.id, req.user.id)
      }
      post.remover()
      res.status(204)
      res.end()
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  }
};
