const connection = require('../config/db.js');

const producto = {
    crear: (data, callback) => {
        const query = 'INSERT INTO productos (nombre, descripcion, cantidad) VALUES (?, ?, ?)';
        connection.query(query, [data.nombre, data.descripcion, data.cantidad], callback);
    },

    obtenerTodos: (callback) => {
        const query = 'SELECT * FROM productos';
        connection.query(query, callback);
    },

    obtenerPorId: (id, callback) => {
        const query = 'SELECT * FROM productos WHERE id = ?';
        connection.query(query, [id], callback);
    },

    actualizar: (id, data, callback) => {
        const query = 'UPDATE productos SET nombre = ?, descripcion = ?, cantidad = ? WHERE id = ?';
        connection.query(query, [data.nombre, data.descripcion, data.cantidad, id], callback);
    },

    eliminar: (id, callback) => {
        const query = 'DELETE FROM productos WHERE id = ?';
        connection.query(query, [id], callback);
    }
};

module.exports = producto;
