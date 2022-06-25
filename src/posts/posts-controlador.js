const Post = require('./posts-modelo');
const { InvalidArgumentError } = require('../erros');

module.exports = {
  async adiciona(req, res) {
    try {
      req.body.autor = req.user.id;
      const post = new Post(req.body);
      await post.adiciona();
      
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
      if (!req.estaAutenticado) {
        posts = posts.map(post => ({titulo: post.titulo, conteudo: post.conteudo}))
      }
      res.send(posts);
    } catch (erro) {
      return res.status(500).json({ erro: erro });
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
      const post = await Post.buscaPorId(req.params.id, req.user.id)
      post.remover()
      res.status(204)
      res.end()
    } catch (erro) {
      return res.status(500).json({ erro: erro.message })
    }
  }
};
