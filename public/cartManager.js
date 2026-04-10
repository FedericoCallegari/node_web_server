/**
 * Módulo centralizado para gestionar el carrito de compras
 * Maneja: localStorage, UI updates, validaciones
 */

const STORAGE_KEY = "carrito";

class CartManager {
  constructor() {
    this.cart = this.loadFromStorage();
    this.contadorCarrito = document.getElementById("contador-carrito");
    this.precioTotal = document.getElementById("precioTotal");
  }

  /**
   * Carga el carrito desde localStorage
   */
  loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Guarda el carrito en localStorage
   */
  saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
  }

  /**
   * Obtiene el carrito actual
   */
  getCart() {
    // Siempre recargar del localStorage para sincronización
    this.cart = this.loadFromStorage();
    return this.cart;
  }

  /**
   * Agrega un producto al carrito
   */
  addProduct(productId, productName, productPrice) {
    // Sincronizar primero con localStorage
    this.cart = this.loadFromStorage();
    
    const existingProduct = this.cart.find((p) => p.id == productId);

    if (existingProduct) {
      existingProduct.cantidad++;
    } else {
      this.cart.push({
        id: productId,
        nombre: productName,
        precio: productPrice,
        cantidad: 1,
      });
    }

    this.saveToStorage();
    this.updateUI();
  }

  /**
   * Elimina un producto del carrito
   */
  removeProduct(productId) {
    // Sincronizar primero con localStorage
    this.cart = this.loadFromStorage();
    this.cart = this.cart.filter((p) => p.id != productId);
    this.saveToStorage();
    this.syncAndUpdateUI();
  }

  /**
   * Vacía el carrito completamente
   */
  clearCart() {
    // Sincronizar primero
    this.cart = this.loadFromStorage();
    this.cart = [];
    this.saveToStorage();
    this.syncAndUpdateUI();
  }

  /**
   * Sincroniza con localStorage y actualiza UI sin recursión
   */
  syncAndUpdateUI() {
    this.cart = this.loadFromStorage();
    
    if (this.contadorCarrito) {
      this.contadorCarrito.innerText = this.getTotalQuantityFromCart();
    }
    if (this.precioTotal) {
      this.precioTotal.innerText = this.getTotalPriceFromCart();
    }
  }

  /**
   * Obtiene cantidad total usando this.cart actual (sin sincronizar)
   */
  getTotalQuantityFromCart() {
    return this.cart.reduce((acc, product) => acc + product.cantidad, 0);
  }

  /**
   * Obtiene precio total usando this.cart actual (sin sincronizar)
   */
  getTotalPriceFromCart() {
    return this.cart.reduce(
      (acc, product) => acc + product.precio * product.cantidad,
      0
    );
  }

  /**
   * Obtiene la cantidad total de productos
   */
  getTotalQuantity() {
    // Sincronizar para asegurar datos frescos
    this.cart = this.loadFromStorage();
    return this.getTotalQuantityFromCart();
  }

  /**
   * Obtiene el precio total
   */
  getTotalPrice() {
    // Sincronizar para asegurar datos frescos
    this.cart = this.loadFromStorage();
    return this.getTotalPriceFromCart();
  }

  /**
   * Actualiza el contador y precio en la UI
   */
  updateUI() {
    // Sincronizar primero
    this.cart = this.loadFromStorage();
    
    if (this.contadorCarrito) {
      this.contadorCarrito.innerText = this.getTotalQuantityFromCart();
    }
    if (this.precioTotal) {
      this.precioTotal.innerText = this.getTotalPriceFromCart();
    }
  }

  /**
   * Valida que el carrito tenga productos
   */
  isEmpty() {
    // Recargar desde localStorage para sincronización
    this.cart = this.loadFromStorage();
    return this.cart.length === 0;
  }
}

export { CartManager };
