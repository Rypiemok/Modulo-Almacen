const express = require('express')

const cors = require('cors')

const productoRoutes = require('./routes/productoRoutes.js')

const connection = require('./config/db.js')

const app = express();

const db = require('./config/db.js');
app.use (cors());

app.use (express.json());

app.use("/productos", productoRoutes);  

const PORT = 3307;

app.listen(PORT, () => {
    
    console.log(`Servidor corriendo en http://localhost:${PORT}`);

});

