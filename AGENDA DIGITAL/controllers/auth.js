const { json } = require('express')//se importa json de express
const User = require('../models/users')//contiene el esquema de usuario para interactuar con la base de datos
const jwt = require('jsonwebtoken')// libreria utilizada para generar y verificar JWT(tokens de autenticacion)

//esta funcion toma un objeto user como paramero,genera y firma un JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' })
}//el process es la clave secreta que se utiliza para firmar el token,debe ser configurada en las variables de entorno del proyecto

const registerUser = async (req, res) => {
    const { email, name, password } = req.body//obtenemos los datos del usuario del cuerpo de la solicitud

    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' })//comprobamos que el usuario no esta registrado anteriormente
        }
        const newUser = await User.create({ email, name, password })//si no esta registrado se crea un nuevo token
        const token = generateToken(newUser)
        if (!token) {
            return res.status(400).json({ message: 'Error al crear el token' })//si no se genera nos da error
        }
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: token,
        })
    } catch (error) {
        console.log(error)
        res.status(500)
    }

}

module.exports = { registerUser };