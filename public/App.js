import { getData } from "./getData.js";
import { CartManager } from "./cartManager.js";
import { renderizarProductoEnCarrito } from "./cartRenderer.js";
import { inicializarListenerEliminacion } from "./carritoIndex.js";

const cart = new CartManager();

export const mostrarProductos = async () => {

    const contenedorProductos = document.getElementById("producto-contenedor");
    
    try{
        //Mostrar Loader
        contenedorProductos.innerHTML ='<p class="text-center">Cargando...</p>';

        const productos = await getData();

        //Limpiar contenedor
        contenedorProductos.innerHTML = '';

        productos.forEach(producto=> {
            //Crear HTML directamente sin sobrescribir
            const html = ` 
                <div class="card">
                    <img src="${producto.img}" class="card-img-top" alt ="${producto.nombre}" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Descripción:  ${producto.desc}</p>
                        <p class="card-text">Precio: ${producto.precio}</p>
                        <button class="btn btn-primary comprar-btn" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">
                         Comprar
                         </button>
                    </div>
                </div>
            `;
            const div= document.createElement('div');
            div.innerHTML = html;
            const card = div.firstElementChild;
            contenedorProductos.appendChild(card);
            
            // Agregar listener cuando la imagen cargue
            const img = card.querySelector('.card-img-top');
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });

        //Event Delegation: Un único listener en el contenedor
        contenedorProductos.addEventListener('click', (e) => {
            const btn = e.target.closest('.comprar-btn');
            if (btn) {
                const productoId = btn.dataset.id;
                const productoNombre = btn.dataset.nombre;
                const productoPrecio = btn.dataset.precio;
                
                cart.addProduct(productoId, productoNombre, productoPrecio);
                renderizarProductoEnCarrito(productoId, productoNombre, productoPrecio);
                inicializarListenerEliminacion(); // Seguro llamar múltiples veces
                
                Toastify({
                    text: `Se añadió ${productoNombre} al carrito`,
                    duration: 3000,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #69A0FA, #3380FE)",
                        }
                    }).showToast();
                }
        });

    } catch (error) {
        contenedorProductos.innerHTML = '<p class="text-center text-danger">Error al cargar los productos</p>';
        console.error("Error al mostrar productos:", error);
    }
};
    
    
