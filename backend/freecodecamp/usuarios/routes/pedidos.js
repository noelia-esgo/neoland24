const express = require('express'); // Importamos Express
const router = express.Router(); // Creamos un enrutador

// Importamos los controladores de productos
const { listarPedidos, agregarPedido, eliminarPedido, listarPedido, actualizarPedido } = require('../controllers/pedidos');

// Importamos el middleware para validar productos
const validarPedido = require('../middlewares/pedidosMiddleware');

// Rutas para productos
router.get('/', listarPedidos); // Endpoint para listar todos los productos
router.get('/:id', listarPedido); // Endpoint para listar un producto por ID
router.post('/', validarPedido, agregarPedido); // Endpoint para agregar un producto (con validación)
router.put('/:id', validarPedido, actualizarPedido); // Endpoint para actualizar un producto por ID (con validación)
router.delete('/:id', eliminarPedido); // Endpoint para eliminar un producto por ID

module.exports = router; //