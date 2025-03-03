const API_URL = "http://localhost:3307/productos";

const obtenerProductos = async () => {
    try {
        const respuesta = await fetch(API_URL);
        const productos = await respuesta.json();  

        console.log("Datos recibidos:", productos);

        const tabla = document.getElementById('tablaProductos');
        tabla.innerHTML = '';

        productos.forEach((producto) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td>
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>  
                    <button onclick="editarProducto(${producto.id}, '${producto.nombre}', '${producto.descripcion}', '${producto.cantidad}')">Editar</button>  
                </td>
            `;

            fila.style.color = "white"; //Esto lo realizamos para poder cambiar el color del texto, es ideal especialmente si nuestro background es de color oscuro al igual que el texto
            tabla.appendChild(fila);    
        });

    } catch (error) {
        console.log("Error al obtener productos:", error);
    }
};
document.addEventListener("DOMContentLoaded", obtenerProductos);
const agregarProducto = async (producto) => {
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto),
        });

        obtenerProductos();
    } catch (error) {
        console.log("Error al agregar producto", error);
    }

    obtenerProductos();
    
};

const eliminarProducto = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        obtenerProductos();
    } catch (error) {
        console.log("Error al eliminar producto", error);
    }
};

const editarProducto = (id, nombre, descripcion, cantidad) => {
    document.getElementById("nombre").value = nombre;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("cantidad").value = cantidad;

    const form = document.getElementById("formProducto");
    form.onsubmit = async (event) => {
        event.preventDefault();

        try {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: document.getElementById("nombre").value,
                    descripcion: document.getElementById("descripcion").value,
                    cantidad: document.getElementById("cantidad").value,
                }),
            });

            form.reset();
            form.onsubmit = manejoSubmit;
            obtenerProductos();
        } catch (error) {
            console.log("Error al editar producto", error);
        }
    };
};

const manejoSubmit = (event) => {
    event.preventDefault();

    const nuevoProducto = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        cantidad: document.getElementById("cantidad").value,
    };

    agregarProducto(nuevoProducto);
    event.target.reset();
};

document.getElementById("formproductos").addEventListener("submit", manejoSubmit);
obtenerProductos();
