require('dotenv').config()

const app = require('./app');
const port = process.env.PORT || 3000;
const db = require('./database');

const { InvalidArgumentError, NotFoundError, NotAuthorizedError } = require('./src/erros');
const jwt = require('jsonwebtoken')

app.use((req, res, next) => {
    res.set({
        'Content-Type': 'application/json' 
    })

    next()
})

const routes = require('./rotas');
routes(app);

//Middlewares
app.use((erro, req, res, next) => {
    let status = 500;
    const body = {
        mensagem: erro.message
    }
    if (erro instanceof NotFoundError) {
        status = 404;
    }

    if (erro instanceof NotAuthorizedError) {
        status = 401;
    }

    if (erro instanceof InvalidArgumentError) {
        status = 400;
    }

    if (erro instanceof jwt.JsonWebTokenError) {
        status = 401;
    }

    if (erro instanceof jwt.TokenExpiredError) {
        status = 401;
        body.expiredAt = erro.expiredAt
    }

    res.status(status)
    res.json(body)
})

app.listen(port, () => console.log(`App listening on port ${port}`));
