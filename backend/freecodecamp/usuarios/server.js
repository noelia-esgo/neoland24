const express = require('express') // importando el modulo de express 
const app = express() // Creamos una instancia de express
const userRouter = require('./routes/users')
const productsRouter= require('./routes/products')
const pedidosRouter= require('./routes/pedidos')

app.use(express.json())
app.use('/users', userRouter)
app.use('/products', productsRouter)
app.use('/pedidos', pedidosRouter)

app.listen(5000, ()=>{
    console.log('El servidor se inicio correctamente')
})