module.exports = (cargosObrigatorios) => (req, res, next) => {
    req.user.cargo = 'assinante'
    if (cargosObrigatorios.indexOf(req.user.cargo) === -1) {
        console.log('Esta rota está bloqueada')
    }

    proximo()
}