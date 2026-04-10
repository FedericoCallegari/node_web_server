import { CartManager } from "./cartManager.js";

const cart = new CartManager();

export const actualizarCarrito = () => {
    cart.updateUI();
};


