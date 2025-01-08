const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("CONEXION A MONGO DB COMPLETADA")
    } catch (error) {
        console.log( error)
    }
}

module.exports = connectDB