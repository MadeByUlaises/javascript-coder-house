const productos = [
    {
        id: "piedra-01",
        titulo: "Rodocrosita",
        imagen: "./imgs/rodocrosita.jpeg",
        categoria: {
            nombre: "Piedras",
            id: "con envio"
        },
        precio: 500
    },
    {
        id: "piedra-02",
        titulo: "Agata",
        imagen: "./imgs/agata.jpeg",
        categoria: {
            nombre: "Piedras",
            id: "sin envio"
        },
        precio: 289
    },
    {
        id: "piedra-03",
        titulo: "Topacio",
        imagen: "./imgs/topacio.jpeg",
        categoria: {
            nombre: "Piedras",
            id: "sin envio"
        },
        precio: 130
    },
    {
        id: "piedra-04",
        titulo: "Cuarzo",
        imagen: "./imgs/cuarzo.jpeg",
        categoria: {
            nombre: "Piedras",
            id: "sin envio"
        },
        precio: 876
    },
    {
        id: "piedra-05",
        titulo: "Pirita",
        imagen: "./imgs/pirita.jpeg",
        categoria: {
            nombre: "Piedras",
            id: "con envio"
        },
        precio: 900
    },
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito-carrito");
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML ="";

    productosElegidos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}"> <div>
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
    `;

        contenedorProductos.append(div)
    })
    actualizarBotonesAgregar();
}
cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);  
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            console.log(productoCategoria);
        
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        
    })
});


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}
let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}



function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find( producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
} else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
    console.log(numerito);
}
