const fs = require('fs'); // Importamos el módulo `fs` para manejar el sistema de archivos
const path = require('path'); // Importamos `path` para manejar rutas de archivos

// Ruta al archivo JSON donde se almacenan los pedidos
const pedidosPath = path.join(__dirname, '../data/pedidos.json');

// Función para leer productos desde el archivo JSON
const leerPedidos = () => {
    const data = fs.readFileSync(pedidosPath, 'utf-8'); // Leemos el archivo como texto
    return JSON.parse(data); // Convertimos el texto en un objeto JSON
};

// Controlador para listar todos los productos
const listarPedidos = (req, res) => {
    const pedidos = leerPedidos(); // Obtenemos todos los productos
    res.json(pedidos); // Respondemos con la lista de productos en formato JSON
};

// Controlador para listar un producto por su ID
const listarPedido = (req, res) => {
    const id = +req.params.id; // Convertimos el ID de los parámetros a número
    const pedidos = leerPedidos(); // Obtenemos todos los productos
    const pedido = pedidos.find((producto) => producto.id === id); // Buscamos el producto por su ID

    if (pedido) return res.json(pedido); // Si el producto existe, lo devolvemos en la respuesta
    res.send('El pedido no existe'); // Si no existe, respondemos con un mensaje de error
};

// Función para escribir productos en el archivo JSON
const escribirPedidos = (pedidos) => {
    console.log("🚀 ~ escribirPedidos ~ pedidos:",pedidos); // Log para depuración
    fs.writeFileSync(pedidosPath, JSON.stringify(pedidos, null, 2)); // Escribimos los productos en el archivo JSON con formato legible
};

// Controlador para agregar un producto nuevo
const agregarPedido = (req, res) => {
    const pedidos = leerPedidos(); // Obtenemos los productos existentes
    const nuevoPedido = req.body; // Obtenemos los datos del nuevo producto del cuerpo de la solicitud
    nuevoPedido.id = pedidos.length + 1; // Generamos un ID único basado en la longitud del array
    pedidos.push(nuevoPedido); // Agregamos el nuevo producto al array
    escribirPedidos(pedidos); // Guardamos los productos actualizados en el archivo JSON
    res.json(nuevoPedido); // Respondemos con el producto recién agregado
};

// Controlador para eliminar un producto por su ID
const eliminarPedido = (req, res) => {
    const pedidos = leerPedidos(); // Obtenemos los productos existentes
    const id = +req.params.id; // Convertimos el ID de los parámetros a número
    const pedidosFiltrados =pedidos.filter((producto) => pedido.id !== id); // Filtramos los productos eliminando el que coincide con el ID

    console.log("🚀 ~ eliminarPedido ~ pedidosFiltrados:", pedidosFiltrados); // Log para depuración

    if (pedidosFiltrados.length === pedidos.length) {
        return res.status(404); // Si el producto no fue encontrado, devolvemos un error 404
    }

    escribirPedidos(pedidosFiltrados); // Guardamos los productos filtrados en el archivo JSON
    res.send('Pedido eliminado'); // Respondemos con un mensaje de éxito
};

// Controlador para actualizar un producto por su ID
const actualizarPedido = (req, res) => {
    const pedidos = leerPedidos(); // Obtenemos los productos existentes
    const newInfoPedidos = req.body; // Obtenemos la nueva información del cuerpo de la solicitud
    const id = +req.params.id; // Convertimos el ID de los parámetros a número
    const index = pedidos.findIndex((producto) => pedido.id === id); // Buscamos el índice del producto en el array

    if (index === -1) {
        return res.status(404).json({ error: 'No encontramos el pedido' }); // Si no encontramos el producto, devolvemos un error 404
    }

    console.log("🚀 ~ actualizarPedido ~ index:", index); // Log para depuración

    pedidos[index] = { ...pedidos[index], ...newInfoPedido }; // Actualizamos los datos del producto manteniendo los existentes
    escribirProductos(pedidos); // Guardamos los productos actualizados en el archivo JSON
    res.status(200).json(pedidos[index]); // Respondemos con el producto actualizado
};

// Exportamos los controladores para que puedan ser utilizados en las rutas
module.exports = { listarPedidos, agregarPedido, eliminarPedido, listarPedido, actualizarPedido };