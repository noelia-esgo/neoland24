const express = require('express')
const connectDB = require('./config/db')
const userRoutes = require('./routes/users')
const authRouter = require('./routes/auth')
const studentRouter = require('./routes/students')
const registerRouter = require('./routes/registers')



require('dotenv').config();

const server = express()

connectDB()


server.use(express.json())
server.use('/users', userRoutes)
server.use('/auth', authRouter)
server.use('/students', studentRouter)
server.use('/registers', registerRouter)


server.listen(3000, () => {
    console.log('EL SERVIDOR SE INICIO CORRECTAMENTE')
})




