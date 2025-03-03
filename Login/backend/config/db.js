//En este apartado realizaremos la conexion con la base de datos
const mysql = require('mysql2')

const connection = mysql.createConnection ({

    host: 'localhost', //Nos indica que estamos en modo local 
    user: 'root',
    password: '',
    database: 'crud_producto',
    port: 3306


});
connection.connect((err) => {

    if (err) {
        console.log('Error al conecar con MySQL: ', err)

        return;

    }

    console.log('Conectado exitosamente a la base de datos', connection.config.database);


})

module.exports = connection
