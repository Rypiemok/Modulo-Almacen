const e = require('express');
const producto = require('../models/productoModel.js'); 



exports.crearProducto =(req, res) => {

    producto.crear(req.body, (error, results) => {

        if (error) {
            return res.status(500).send('Error al crear el producto')
        }
        res.status(201).send(`Producto creado con ID: ${results.insertId}`);



    });
};

exports.obtenerProductos = (req, res) => {
    producto.obtenerTodos((error, results)=> {

        if (error) {
            return res.status(500).send('Error al obtener los productos');
        }
        res.json(results)

});
};

exports.obtenerProductosPorId = (req, res) => {
    const id = req.params.id;

    producto.obtenerPorId(id, (err, result) => {
        if (err) {
            return res.status(500).send('Error al obtener el producto');
        }
        if (result.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(result[0]);
    });
};

exports.actualizarProductos =(req, res) => {
    const id = req.params.id;

    producto.actualizar(id, req.body, (error, results) => {

        if (error) {
            return res.status(500).send('Error al actualizar el producto');
        }
        res.send('Producto actualizado con exito');
    });
};

exports.eliminarProductos = (req, res) => {
    const id = req.params.id;
    producto.eliminar(id, (error, results) => {
        if (error) {
            return res.status(500).send('Error al eliminar el producto');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');

        }
        res.send('Producto eliminado exitosamente');
    });
};
