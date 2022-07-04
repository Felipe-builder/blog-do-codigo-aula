const nodemailer = require('nodemailer');

const configuracaoEmailProducao = {
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USUARIO,
        pass: process.env.EMAIL_SENHA
    },
    secure: true
}

const configuracaoEmailTeste = (contaTeste) => ({
    host: 'smtp.ethereal.email',
    auth: contaTeste,
})

async function criaConfiguracaoEmail() {
    if (process.env.NODE_ENV === 'production') {
        return configuracaoEmailProducao;
    } else {
        const contaTeste = await nodemailer.createTestAccount();
        return configuracaoEmailTeste(contaTeste)
    }
}

class Email {    
    async enviaEmail() {
        const configuracaoEmail = await criaConfiguracaoEmail()
        const transportador = nodemailer.createTransport(configuracaoEmail);
        const info = await transportador.sendMail(this)
    
        if (process.env.NODE_ENV !== 'production') {
            console.log('URL: ' + nodemailer.getTestMessageUrl(info));
        }
    }

}

class EmailVerificacao extends Email {
    constructor(usuario, endereco) {
        super();
        this.from = '"Blod do Código" <noreply@blogdocodigo.com.br>',
        this.to = usuario.email,
        this.subject = 'Verificacao de e-mail',
        this.text = `Olá! Verifique seu e-mail aqui: ${endereco}`,
        this.html = `<h1>Olá!</h1> Verifique seu e-mail aqui: <a href="${endereco}">${endereco}</a>`
    }
}


class EmailRedifinicaoSenha extends Email {
    constructor(usuario, token) {
        super();
        this.from = '"Blod do Código" <noreply@blogdocodigo.com.br>',
        this.to = usuario.email,
        this.subject = 'Redefinição de Senha',
        this.text = `Olá! Você pediu para redefinir sua senha. Use o token a seguir para trocar a sua senha: ${token}`,
        this.html = `<h1>Olá!</h1> Você pediu para redefinir sua senha. Use o token a seguir para trocar a sua senha: ${token}`
    }
}

class EmailPostCriado extends Email {
    constructor(usuario, idPost, tituloPost) {
        super();
        this.from = '"Blod do Código" <noreply@blogdocodigo.com.br>',
        this.to = usuario.email,
        this.subject = 'Post criado com sucesso',
        this.text = `Olá! Seu post foi criado com sucesso. ID do post: ${idPost}. Título: ${tituloPost}`,
        this.html = `<h1>Olá!</h1> Seu post foi criado com sucesso. ID do post: ${idPost}. Título: ${tituloPost}`
    }
}


module.exports = { EmailVerificacao, EmailRedifinicaoSenha, EmailPostCriado};