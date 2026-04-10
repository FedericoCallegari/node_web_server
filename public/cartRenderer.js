/**
 * Módulo para renderizar productos en el carrito
 * Sincroniza con CartManager
 */
import { inicializarListenerEliminacion } from "./carritoIndex.js";
import { CartManager } from "./cartManager.js";

const contenedorCarrito = document.getElementById("carrito-contenedor");
const cart = new CartManager();

/**
 * Renderiza un producto individual en el carrito
 */
export const renderizarProductoEnCarrito = (productoId, productoNombre, productoPrecio) => {
  const productoExistente = document.querySelector(
    `.productoEnCarrito[data-producto-id="${productoId}"]`
  );

  if (productoExistente) {
    // Actualizar cantidad desde CartManager (fuente de verdad)
    actualizarCantidadEnDOM(productoId);
  } else {
    // Crear nuevo elemento
    let div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.setAttribute("data-producto-id", productoId);
    div.innerHTML = `<p>${productoNombre}</p>
                     <p>Precio: ${productoPrecio}</p> 
                     <p id="cantidad${productoId}">Cantidad: 1</p>
                     <button id="eliminar${productoId}" class="boton-eliminar"><i class="fa-solid fa-trash-can"></i></button>`;
    contenedorCarrito.appendChild(div);
  }
};

/**
 * Actualiza la cantidad de un producto en el DOM usando CartManager como fuente de verdad
 */
const actualizarCantidadEnDOM = (productoId) => {
  const cartProduct = cart.getCart().find((p) => p.id == productoId);
  if (cartProduct) {
    const cantidadElement = document.querySelector(`#cantidad${productoId}`);
    if (cantidadElement) {
      cantidadElement.innerHTML = `Cantidad: ${cartProduct.cantidad}`;
    }
  }
};

/**
 * Renderiza todos los productos del carrito (al cargar la página)
 * Sincroniza con CartManager - la fuente de verdad
 */
export const renderizarCarritoCompleto = (productos) => {
  contenedorCarrito.innerHTML = ""; // Limpiar

  productos.forEach((producto) => {
    // Crear elemento del carrito
    let div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.setAttribute("data-producto-id", producto.id);
    div.innerHTML = `<p>${producto.nombre}</p>
                     <p>Precio: ${producto.precio}</p> 
                     <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
                     <button id="eliminar${producto.id}" class="boton-eliminar"><i class="fa-solid fa-trash-can"></i></button>`;
    contenedorCarrito.appendChild(div);
  });

  // Inicializar listeners de eliminación (event delegation)
  inicializarListenerEliminacion();
};
