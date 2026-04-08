

const modalContenedor = document.querySelector('.modal-container');
const abrirCarrito = document.getElementById('open');
const cerrarCarrito = document.getElementById('cerrar');
const modalCarrito = document.querySelector('.modal-carrito');
// const modalContinuar = document.getElementById('continuar');
const cancelarCompra = document.getElementById('cancelar-compra')

// Validación: Si un elemento es null, hay un problema
if (!abrirCarrito) console.error('ERROR: Elemento id="open" no encontrado');
if (!cerrarCarrito) console.error('ERROR: Elemento id="cerrar" no encontrado');
if (!modalContenedor) console.error('ERROR: Elemento .modal-container no encontrado');
if (!modalCarrito) console.error('ERROR: Elemento .modal-carrito no encontrado');

if (abrirCarrito) {
    abrirCarrito.addEventListener('click', () => {
        modalContenedor.classList.toggle('modal-active');
        console.log('Modal toggled');
    })
}

if (cerrarCarrito) {
    cerrarCarrito.addEventListener('click', () => {
        modalContenedor.classList.remove('modal-active');
        console.log('Modal cerrado');
    })
}

if (modalCarrito) {
    modalCarrito.addEventListener('click', (e) =>{
        e.stopPropagation();
    })
}




