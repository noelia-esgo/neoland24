const mongoose = require('mongoose')//importamos mongoose
const bcrypt = require('bcryptjs')//importamos para cifrar la contraseña
const userSchema = new mongoose.Schema(  //define el esquema para los documentos de usuario en mongoDB
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: {
            type: String,
            required: true,
            minLength: [6, 'La contraseña debe tener al menos 6 caracteres']
        },

    }
)
//middleware para cifrar la contraseña antes de guardar

userSchema.pre('save', async function name(next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate()
    console.log("🚀 MIDDLEWARE ~ update:", update)
    if (update.password) {
        const salt = await bcrypt.genSalt(10)
        update.password = await bcrypt.hash(update.password, salt)
    }
    next()
})


userSchema.methods.matchPassword = async (password) => {  //verificar si una contraseña proporcionada coincide con la contraseña almacenada en la base de datos.
    return await bcrypt.compare(password, this.password) //Compara la contraseña proporcionada (password) con la contraseña cifrada almacenada en la base de datos (this.password). Devuelve true si coinciden, o false si no.
}


const User = mongoose.model('User', userSchema)

module.exports = User