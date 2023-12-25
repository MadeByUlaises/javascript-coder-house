const PRODUCTOS = {
    Rodocrosita: {cantidad: 150, stock: true, envio: true, precio: 500},
    Agata: {cantidad: 0, stock: false, envio: false, precio: 589},
    Topacio: {cantidad: 348, stock: true, envio: false, precio: 789},
    Cuarzo: {cantidad: 4, stock: true, envio: false, precio: 876},
    Pirita: {cantidad: 1, stock: true, envio: true, precio: 900},
};

const nombresPiedras = Object.keys(PRODUCTOS);

const nombreUsuario = prompt("¡Bienvenido a la tienda de piedras preciosas! Por favor, ingrese su nombre de usuario:");

function buscarPiedra() {
    let piedraBuscada = prompt("Hola " + nombreUsuario + "! Ingrese el nombre de la Piedra que busca:");

    while (!nombresPiedras.includes(piedraBuscada)) {
        piedraBuscada = prompt("La piedra ingresada no está en el sistema. Ingrese otra piedra:");
    }

    if (PRODUCTOS[piedraBuscada].stock) {
        let mensajeEnvio = "pero no tiene envío disponible";
        if (PRODUCTOS[piedraBuscada].envio) {
            mensajeEnvio = "y tiene envío disponible";
        }
        alert(`El precio de ${piedraBuscada} es $${PRODUCTOS[piedraBuscada].precio.toFixed(2)} ${mensajeEnvio}.`);
    } else {
        alert(`No tenemos ${piedraBuscada} en este momento.`);
    }
}

function calcularCostoYEnvio() {
    const piedrasSeleccionadas = [];

    let seleccionarPiedra = confirm("¿Desea seleccionar una piedra?");
    while (seleccionarPiedra) {
        let piedra = prompt("Ingrese el nombre de la piedra que desea:");

        if (nombresPiedras.includes(piedra)) {
            piedrasSeleccionadas.push(piedra);
        } else {
            alert("La piedra ingresada no está en el sistema.");
        }

        seleccionarPiedra = confirm("¿Desea seleccionar otra piedra?");
    }

    let costoTotal = 0;
    let envioDisponible = false;

    piedrasSeleccionadas.forEach(piedra => {
        costoTotal += PRODUCTOS[piedra].precio;

        if (PRODUCTOS[piedra].envio) {
            envioDisponible = true;
        }
    });

    if (costoTotal > 0) {
        const mensajeEnvioTotal = envioDisponible ? 'Sí' : 'No';
        alert(`El costo total de las piedras seleccionadas es $${costoTotal.toFixed(2)}. Envío disponible: ${mensajeEnvioTotal}`);
    } else {
        alert("No se seleccionaron piedras.");
    }
}

buscarPiedra();
calcularCostoYEnvio();
