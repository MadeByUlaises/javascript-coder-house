const PRODUCTOS = {
    Rodocrosita: {cantidad: 150, stock:true, envio:true},
    Agata: {cantidad: 0, stock:false, envio:false},
    Topacio: {cantidad:348, stock:true, envio:false},
    Cuarzo: {cantidad:4, stock:true, envio:false},
    Pirita: {cantidad: 1, stock:true, envio:true},
}

function busquedaPiedra() {
    let piedraBuscada = prompt("Ingrese el nombre de la Piedra que busca");

    while (!(piedraBuscada in PRODUCTOS)) {
        piedraBuscada = prompt("La piedra ingresada no se encuentra en el sistema, ingrese otra piedra:");
    }

    if (PRODUCTOS[piedraBuscada].stock && PRODUCTOS[piedraBuscada].envio == false) {
        alert("Contamos con" + " " + piedraBuscada + " " + " pero no con envío en este momento.");
    } else if (PRODUCTOS[piedraBuscada].stock && PRODUCTOS[piedraBuscada].envio) {
        alert("La cantidad disponible de" + " " + piedraBuscada + " " + "es" + " " + PRODUCTOS[piedraBuscada].cantidad + " " + "y se pueden realizar envíos.");
    } else if (PRODUCTOS[piedraBuscada].stock == false && PRODUCTOS[piedraBuscada].envio == false) {
        alert("No contamos con" + " " + piedraBuscada + " " + "en este momento");
    } 

} busquedaPiedra();


