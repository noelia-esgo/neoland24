const mongoose = require('mongoose');

// Definimos el esquema de los registros
const registerSchema = new mongoose.Schema({
Alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
},

Sueño: {
    horasDormidas: {
      type: Number, // En horas
    required: true,
    },
    calidadSueño: {
      type: String, // Ejemplo: 'Excelente', 'Bueno', 'Regular', 'Malo'
    required: true,
    },
},
Alimentacion: {
    tipoComida: {
      type: String, // Ejemplo: 'Desayuno', 'Comida', 'Merienda'
        required: true,
    },
    descripcion: {
      type: String, // Descripción de lo que comió
    required: true,
    },
    cantidad: {
      type: String, // cantidad: todo , bastante, poco
      required: true,
    }
},
});


const Register = mongoose.model('Register', registerSchema)

module.exports = Register