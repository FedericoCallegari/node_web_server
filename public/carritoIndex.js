import { actualizarCarrito } from "./actualizarCarrito.js";
import { productos } from "./stock.js";

const contenedorCarrito = document.getElementById("carrito-contenedor");
const cantidadSteps = 2;
let stepActual = 1;


let carritoDeCompras = [];

const botonContinuar = document.getElementById("continuar");

const cancelarCompra = document.getElementById("cancelar-compra")

const botonVaciarCarrito = document.getElementById("vaciar");

const form = document.getElementById("form");

const terminarCompra = document.getElementById("terminar-compra");



//Boton vaciar carrito

botonVaciarCarrito.addEventListener('click',()=>{
  const arrayCompras = carritoDeCompras
  arrayCompras.length = 0;

  actualizarCarrito(arrayCompras);
  vaciarDom();
})

// --->Funcion validar compra:



let mail = document.getElementById("mail");
let numero = document.getElementById("phone");
let direccion = document.getElementById("address");
let pais = document.getElementById("country");
let cbu = document.getElementById("cbu");
let error = document.getElementById("error");
// let comprar = document.querySelector(".comprar")
error.style.color ='red';



  terminarCompra.addEventListener('click', function validarForm (evt){
  evt.preventDefault();
  let mensajesError = [];
  console.log("pasa algo")
    if(mail.value === null || mail.value ===''){
    mensajesError.push('Ingrese su email');
  }
    if(numero.value === null || numero.value ===''){
    mensajesError.push('Ingrese su numero de telefono');
  }
    if(direccion.value === null || direccion.value ===''){
    mensajesError.push('Ingrese su direccion');
  }
    if(pais.value === null || pais.value ===''){
    mensajesError.push('Ingrese su pais');
  }
    if(cbu.value === null || cbu.value ===''){
    mensajesError.push('Ingrese su cbu');
  }
  error.innerHTML = mensajesError.join(', ');

  if (mensajesError == 0){
    terminarCompra.addEventListener("click", function compraConfirm(evt){
    console.log("terminar compra");
    stepActual = 1;
    const arrayCompras = carritoDeCompras
    arrayCompras.length = 0;
    
    actualizarCarrito(arrayCompras);
    vaciarDom()
  
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'La compra se a realizado con exito.',
      showConfirmButton: false,
      timer: 2000
    })
    setTimeout(function(){location.reload()},2000)
  });
  }
});



//--->Funcion Cancelar Compra:
cancelarCompra.addEventListener("click", () => {
  console.log("terminar compra");
  stepActual = 1;
  const arrayCompras = carritoDeCompras
  arrayCompras.length = 0;
  actualizarCarrito(arrayCompras);
  vaciarDom()
  

  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'La compra a sido cancelada.',
    showConfirmButton: false,
    timer: 2000
  })
  setTimeout(function(){location.reload()},2000)
  
});






//---- ---- ---- ----
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

  //------

  //Esconder los steps
  for (let i = 0; i < stepsAEsconder.length; ++i) {
    hide(stepsAEsconder[i]);
  }

  //only show the right one
  for (let i = 0; i < steps.length; ++i) {
    show(steps[i]);
  }

}

function continuarAlSiguienteStep(e) {
  stepActual += 1;
  irAlStep(stepActual);
}

botonContinuar.addEventListener("click", (e) => {
  if (carritoDeCompras <= 0) {
    Swal.fire({
      icon: "error",
      text: "Ingrese un producto en el carrito",
    });
  } else {
    continuarAlSiguienteStep(e);
  }
});

//Borre el productoEnCarrito del DOM con la siguente funcion ,de la linea 15 del archivo index.js.Este persistia en el DOM por el DOMContentLoaded  --->>
function vaciarDom() {
  let borrar = document.querySelectorAll(".productoEnCarrito");
  borrar.forEach((element) => element.remove());
}

export const carritoIndex = (productoId) => {
  if (localStorage.getItem("carrito")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
  }
  console.log(carritoDeCompras);
  let productoRepetido = carritoDeCompras.find(
    (producto) => producto.id == productoId
  );
  contarProductosRepetidos(productoRepetido, productoId);
  eliminarProductoCarrito(productoId);
};

//------------->Eliminar Producto<----------------//
export const eliminarProductoCarrito = (productoId, productoNombre) => {
  console.log(productoNombre);
  if (localStorage.getItem("carrito")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
  }
  let botonEliminar = document.getElementById(`eliminar${productoId}`);

  botonEliminar?.addEventListener("click", () => {
    swal
      .fire({
        title: `Se elimino el producto con exito`,
        icon: "success",
        buttons: true,
        dangerMode: true,
      })
      .then((result) => {
        if (result) {
          botonEliminar.parentElement.remove();
          carritoDeCompras = carritoDeCompras.filter(
            (el) => el.id != productoId
          );
          actualizarCarrito(carritoDeCompras);
        }
      });
  });
};

//-----> COMPRAR PRODUCTO --->

export const contarProductosRepetidos = (prodRepetido, productoId) => {
  if (prodRepetido) {
    prodRepetido.cantidad++;
    document.getElementById(
      `cantidad${prodRepetido.id}`
    ).innerHTML = `<p id=cantidad${prodRepetido.id}>Cantidad:${prodRepetido.cantidad}</p>`;
    actualizarCarrito(carritoDeCompras);
  } else {
    renderProductoCarrito(productoId);
  }
};

const renderProductoCarrito = (productoId) => {
  let producto = productos.find((producto) => producto.id == productoId);
  carritoDeCompras.push(producto);
  producto.cantidad = 1;
  let div = document.createElement("div");
  div.classList.add("productoEnCarrito");
  div.innerHTML = ` <p>${producto.nombre}</p>
                    <p>Precio:${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                    <button id="eliminar${producto.id}" class="boton-eliminar"><i class="fa-solid fa-trash-can"></i></button>
                  `;
  contenedorCarrito.appendChild(div);
  actualizarCarrito(carritoDeCompras);
  
};
