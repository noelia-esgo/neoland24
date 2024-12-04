const { nameValidator } = require('../utils/validator'); // Importamos el validador de nombres

// Middleware para validar productos
const validarPedido = (req, res, next) => {
    const { name, preciototal } = req.body; // Extraemos los datos del cuerpo de la solicitud

    const isValidName = nameValidator(name); // Validamos el nombre
    if (!isValidName) {
        return res.status(400).json({ error: 'El nombre del pedido es inválido' }); // Enviamos error si el nombre es inválido
    }

    if (!preciototal || typeof preciototal !== 'number' || preciototal < 0) {
        return res.status(400).json({ error: 'El precio del pedido es inválido' }); // Enviamos error si el precio es inválido
    }

    next(); // Pasamos al siguiente middleware o controlador si todo es válido
};

module.exports = validarPedido; // Exportamos el middleware