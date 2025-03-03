const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController.js"); 

router.post("/", productoController.crearProducto);
router.get("/", productoController.obtenerProductos);
router.get("/:id", productoController.obtenerProductosPorId); 
router.put("/:id", productoController.actualizarProductos);
router.delete("/:id", productoController.eliminarProductos);

module.exports = router;
