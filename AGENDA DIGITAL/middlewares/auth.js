const jwt = require('jsonwebtoken')

    
const authenticate = async (req, res, next) => {//Creamos una función de middleware 'authenticate' para autenticar las solicitudes.
    const token = req.headers.authorization.split(' ')[1];// Comprobamos si el encabezado 'Authorization' está presente en los encabezados de la solicitud
    if (!token) {
        return res.status(401).json({ message: 'No estas autorizado' })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode)
        next()
    } catch (error) {
        console.log( error)
        return res.status(401).json({ message: 'Token invalido' })

    }

}

module.exports = authenticate