//import { productos } from "./stock.js";

const getTotalCarrito = () => {
    const localStorageCarrito = JSON.parse(localStorage.getItem("carrito"));
    return localStorageCarrito.reduce((acc, el) => acc + el.precio, 0);
    };

            function limpiarMetodoDePago (){
                const divALimpiar = document.querySelector('.limpiar');
                divALimpiar && divALimpiar.remove()
                //divALimpiar?.remove();
            }


// Controlo los botones para poder seleccionar el metodo de compra.
    const metodoEfectivo = document.getElementById("metodoEfectivo");
    const metodoTarjeta = document.getElementById("metodoTarjeta");
    const checked1 = document.getElementById("efectivo");
    const checked2 = document.getElementById("tarjeta");
        checked1.addEventListener("click", respuestaClick1)
        function respuestaClick1(){
            limpiarMetodoDePago();
            if(checked1.checked != false){
                checked2.checked = null;
                const div = document.createElement("div");
            //Operador ++
            div.innerHTML +=`<div class="limpiar" style="width: 18rem;">
                                    <div>1 pago de ${getTotalCarrito()}$ ars</div>
                            </div>`;
            metodoEfectivo.appendChild(div);
            
            }
        }
        checked2.addEventListener("click", respuestaClick2)
            function respuestaClick2(){
                limpiarMetodoDePago()
                if(checked2.checked != false){
                    checked1.checked = null;

                    const div = document.createElement("div");
                //Operador ++
                div.innerHTML +=`<div class="limpiar" style="width: 18rem;">
                                    <div>
                                        <input type="radio" name="Tarjeta" id="3pagos" value="2">
                                        <label for="3pagos">   3 pagos de: ${Math.round(getTotalCarrito() / 3 )}$ ars sin interes.</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="Tarjeta" id="6pagos" value="2">
                                        <label for="6pagos">   6 pagos de: ${Math.round(getTotalCarrito() / 6 )}$ ars sin interes.</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="Tarjeta" id="12pagos" value="2">
                                        <label for="12pagos">   12 pagos de: ${Math.round(getTotalCarrito() / 12 )}$ ars sin interes.</label>
                                    </div>
                                </div>`;
                metodoTarjeta.appendChild(div);
                }
        } 

            
            



//------

