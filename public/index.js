import { mostrarProductos } from "./App.js";
import { CartManager } from "./cartManager.js";
import { renderizarCarritoCompleto } from "./cartRenderer.js";

const cart = new CartManager();

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();

  const carritoStorage = cart.getCart();
  
  if (carritoStorage.length > 0) {
    renderizarCarritoCompleto(carritoStorage);
    cart.updateUI();
  }
});
