import { actualizarCarrito } from "./actualizarCarrito.js";
import { mostrarProductos } from "./App.js";
import { eliminarProductoCarrito } from "./carritoIndex.js";

const contenedorCarrito = document.getElementById("carrito-contenedor");
let carritoStorage = [];

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();

  if (localStorage.getItem("carrito")) {
    carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    carritoStorage.map((producto) => {
        let div = document.createElement("div");
        div.classList.add("productoEnCarrito");
        div.innerHTML =        `<p >${producto.nombre}</p>
                                <p >Precio:${producto.precio}</p> 
                                <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
                                <button id="eliminar${producto.id}" class="boton-eliminar"><i class="fa-solid fa-trash-can"></i></button>
                                `;
      contenedorCarrito.appendChild(div);

      actualizarCarrito(carritoStorage);
      console.log(producto.nombre);
      eliminarProductoCarrito(producto.id, producto.nombre);
    });
  }
});
