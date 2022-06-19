module.exports = (cargosObrigatorios) => (req, res, next) => {
    req.user.cargo = 'assinante'
    if (cargosObrigatorios.indexOf(req.user.cargo) === -1) {
        res.status(403)
        res.end()
        return
    }

    next()
}