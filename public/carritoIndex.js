import { CartManager } from "./cartManager.js";

const contenedorCarrito = document.getElementById("carrito-contenedor");
const cantidadSteps = 2;
let stepActual = 1;

const cart = new CartManager();

const botonContinuar = document.getElementById("continuar");
const cancelarCompra = document.getElementById("cancelar-compra");
const botonVaciarCarrito = document.getElementById("vaciar");
const form = document.getElementById("form");
const terminarCompra = document.getElementById("terminar-compra");

// Obtener campos de formulario
let mail = document.getElementById("mail");
let numero = document.getElementById("phone");
let direccion = document.getElementById("address");
let pais = document.getElementById("country");
let cbu = document.getElementById("cbu");
let error = document.getElementById("error");
error.style.color = 'red';

//Boton vaciar carrito
botonVaciarCarrito.addEventListener('click', () => {
  cart.clearCart();
  vaciarDom();
});

// Validación de formulario
terminarCompra.addEventListener('click', function validarForm(evt) {
  evt.preventDefault();
  let mensajesError = [];

  if (mail.value === null || mail.value === '') {
    mensajesError.push('Ingrese su email');
  }
  if (numero.value === null || numero.value === '') {
    mensajesError.push('Ingrese su numero de telefono');
  }
  if (direccion.value === null || direccion.value === '') {
    mensajesError.push('Ingrese su direccion');
  }
  if (pais.value === null || pais.value === '') {
    mensajesError.push('Ingrese su pais');
  }
  if (cbu.value === null || cbu.value === '') {
    mensajesError.push('Ingrese su cbu');
  }

  error.innerHTML = mensajesError.join(', ');

  if (mensajesError.length === 0) {
    stepActual = 1;
    cart.clearCart();
    vaciarDom();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'La compra se ha realizado con éxito.',
      showConfirmButton: false,
      timer: 2000
    });
    setTimeout(function() { location.reload() }, 2000);
  }
});

// Cancelar Compra
cancelarCompra.addEventListener("click", () => {
  stepActual = 1;
  cart.clearCart();
  vaciarDom();

  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'La compra ha sido cancelada.',
    showConfirmButton: false,
    timer: 2000
  });
  setTimeout(function() { location.reload() }, 2000);
});

// Funciones auxiliares
function show(elem) {
  elem.classList.remove("hidden");
}

function hide(elem) {
  elem.classList.add("hidden");
}

function irAlStep(stepNumber) {
  stepActual = stepNumber;
  let stepsAEsconder = document.getElementsByClassName("modal-carrito");
  let steps = document.getElementsByClassName(`step${stepActual}`);

  for (let i = 0; i < stepsAEsconder.length; ++i) {
    hide(stepsAEsconder[i]);
  }

  for (let i = 0; i < steps.length; ++i) {
    show(steps[i]);
  }
}

function continuarAlSiguienteStep(e) {
  stepActual += 1;
  irAlStep(stepActual);
}

botonContinuar.addEventListener("click", (e) => {
  if (cart.isEmpty()) {
    Swal.fire({
      icon: "error",
      text: "Ingrese un producto en el carrito",
    });
  } else {
    continuarAlSiguienteStep(e);
  }
});

function vaciarDom() {
  let borrar = document.querySelectorAll(".productoEnCarrito");
  borrar.forEach((element) => element.remove());
}

// Variable para evitar múltiples inicializaciones
let listenerEliminacionInicializado = false;

// Eliminar Producto del Carrito - Usando Event Delegation
export const inicializarListenerEliminacion = () => {
  // Solo inicializar una vez
  if (listenerEliminacionInicializado) return;
  
  const contenedorCarrito = document.getElementById("carrito-contenedor");

  // Event delegation: un único listener en el contenedor
  contenedorCarrito.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".boton-eliminar");
    
    if (botonEliminar) {
      const productoDiv = botonEliminar.closest(".productoEnCarrito");
      const productoId = productoDiv.getAttribute("data-producto-id");
      const productoNombre = productoDiv.querySelector("p").textContent;

      Swal.fire({
        title: `Se eliminó ${productoNombre} con éxito`,
        icon: "success",
        buttons: true,
        dangerMode: true,
      }).then((result) => {
        if (result) {
          productoDiv.remove();
          cart.removeProduct(productoId);
        }
      });
    }
  });

  listenerEliminacionInicializado = true;
};

export const eliminarProductoCarrito = (productoId, productoNombre) => {
  // Esta función queda por compatibilidad pero ya no se necesita
  // Los listeners se manejan con event delegation
};
