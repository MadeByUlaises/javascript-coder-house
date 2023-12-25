const PRODUCTOS = {
    Rodocrosita: {cantidad: 150, stock: true, envio: true, precio: 500},
    Agata: {cantidad: 0, stock: false, envio: false, precio: 589},
    Topacio: {cantidad: 348, stock: true, envio: false, precio: 789},
    Cuarzo: {cantidad: 4, stock: true, envio: false, precio: 876},
    Pirita: {cantidad: 1, stock: true, envio: true, precio: 900},
};

function buscarPiedra() {
    let piedraBuscada = prompt("Ingrese el nombre de la Piedra que busca:");

    while (!(piedraBuscada in PRODUCTOS)) {
        piedraBuscada = prompt("La piedra ingresada no está en el sistema. Ingrese otra piedra:");
    }

    if (PRODUCTOS[piedraBuscada].stock) {
        const tieneEnvio = PRODUCTOS[piedraBuscada].envio ? "y tiene envío disponible" : "pero no tiene envío disponible";
        alert(`El precio de ${piedraBuscada} es $${PRODUCTOS[piedraBuscada].precio.toFixed(2)} ${tieneEnvio}.`);
    } else {
        alert(`No tenemos ${piedraBuscada} en este momento.`);
    }
}

function calcularCostoYEnvio() {
    const piedrasSeleccionadas = [];

    let seleccionarPiedra = confirm("¿Desea seleccionar una piedra?");
    while (seleccionarPiedra) {
        let piedra = prompt("Ingrese el nombre de la piedra que desea:");

        if (PRODUCTOS[piedra]) {
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
        alert(`El costo total de las piedras seleccionadas es $${costoTotal.toFixed(2)}. Envío disponible: ${envioDisponible ? 'Sí' : 'No'}`);
    } else {
        alert("No se seleccionaron piedras.");
    }
}

buscarPiedra();

calcularCostoYEnvio();
