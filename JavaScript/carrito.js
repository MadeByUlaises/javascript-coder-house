const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar")

function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML="";
    
    productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="carrito-producto-titulo">
                            <small>Titulo</small>
                            <h3>${producto.titulo}</h3>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                        <button class="carrito-producto-eliminar" id=${producto.id}><i class="bi bi-dash-square"></i></button>
                        <button class="carrito-producto-agregar-uno" id=${producto.id}><i class="bi bi-file-plus"></i></button>
                        <button class="carrito-producto-borrar-todo" id=${producto.id}><i class="bi bi-trash"></i></button>                    `;
                    contenedorCarritoProductos.append(div);
    })
} else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
    actualizarBotonesAgregarUno();
    actualizarBotonesBorrarTodas();
}

cargarProductosCarrito();



function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function() {
            const idBoton = this.getAttribute("id");
            eliminarUnidad(idBoton);
        });
    });

    const selectoresCantidad = document.querySelectorAll(".cantidad-selector");
    selectoresCantidad.forEach(selector => {
        selector.addEventListener("change", actualizarCantidad);
    });
}

function eliminarUnidad(idBoton) {
    const producto = productosEnCarrito.find(producto => producto.id === idBoton);

    if (producto) {
        producto.cantidad--;

        if (producto.cantidad <= 0) {
            const index = productosEnCarrito.findIndex(p => p.id === idBoton);
            productosEnCarrito.splice(index, 1);
        }

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        actualizarTotal();
    } else {
        console.error("Producto no encontrado en el carrito");
    }
}

function borrarTodasUnidades(idBoton) {
    const producto = productosEnCarrito.find(producto => producto.id === idBoton);

    if (producto) {
        const index = productosEnCarrito.findIndex(p => p.id === idBoton);
        productosEnCarrito.splice(index, 1);

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        actualizarTotal();
    } else {
        console.error("Producto no encontrado en el carrito");
    }
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarBotonesAgregarUno() {
    const botonesAgregarUno = document.querySelectorAll(".carrito-producto-agregar-uno");

    botonesAgregarUno.forEach(boton => {
        boton.addEventListener("click", function() {
            const idBoton = this.getAttribute("id");
            agregarUnaUnidad(idBoton);
        });
    });
}

function agregarUnaUnidad(idBoton) {
    const producto = productosEnCarrito.find(producto => producto.id === idBoton);

    if (producto) {
        producto.cantidad++;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        actualizarTotal();
    } else {
        console.error("Producto no encontrado en el carrito");
    }
}

function actualizarBotonesBorrarTodas() {
    const botonesBorrarTodas = document.querySelectorAll(".carrito-producto-borrar-todo");

    botonesBorrarTodas.forEach(boton => {
        boton.addEventListener("click", function() {
            const idBoton = this.getAttribute("id");
            borrarTodasUnidades(idBoton);
        });
    });
}

function actualizarTotal () {
    const totalCalculado = productosEnCarrito.reduce((acc,producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function mostrarResumenDeCompra() {
    const resumenCompra = document.getElementById("resumen-compra");
    const fechaEntrega = resumenCompra.querySelector("#fecha-entrega span");
    const totalResumen = resumenCompra.querySelector("#total-resumen");

    const fechaEntregaEstimada = moment().add(7, 'days').format('MMMM D, YYYY');
    fechaEntrega.textContent = fechaEntregaEstimada;

    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalResumen.textContent = `$${totalCalculado}`;

    resumenCompra.classList.remove("disabled");
}

function generarIDUnico() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 100);
    return `${timestamp}-${randomNumber}`;
}

function comprarCarrito() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const idUnico = generarIDUnico();

    mostrarResumenDeCompra(idUnico, total);
    mostrarResumenDeCompra(total);

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    cargarProductosCarrito(); 

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");


    Swal.fire({
        title: '¡Gracias por tu Compra!',
        html: `
            <h3>Resumen de Compra</h3>
            <p id="fecha-entrega-swal">Fecha estimada de entrega: <span></span></p>
            <p>Total: <span id="total-resumen-swal"></span></p>
            <p>ID de Compra: <span id="id-unico-swal"></span></p>
        `,
        icon: "success",
        confirmButtonText: 'Aceptar',
        style: {
            background: "linear-gradient(to right, #820933, #D84797)",
            borderRadius: "2rem"
            },
        didOpen: () => {
            document.getElementById('fecha-entrega-swal').querySelector('span').innerText = obtenerFechaEstimada();
            document.getElementById('total-resumen-swal').innerText = `$${totalCalculado}`;
            document.getElementById('fecha-entrega-swal').querySelector('span').innerText = obtenerFechaEstimada();
            document.getElementById('total-resumen-swal').innerText = `$${totalCalculado}`;
            document.getElementById('id-unico-swal').innerText = idUnico;
        }
    });
}

function obtenerFechaEstimada() {

    const fechaActual = new Date();
    const diasEstimadosEntrega = 5; 
    const fechaEstimada = new Date(fechaActual.getTime() + (diasEstimadosEntrega * 24 * 60 * 60 * 1000));
    return fechaEstimada.toLocaleDateString();
}
