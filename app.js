let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto;
let cantidadIntentos = 0;

asignarTextoElemento('h1', 'Juego del número secreto');
asignarTextoElemento('p', 'Indica un número del 1 al 10');

function verificarIntento() {
    let inputElemento = document.getElementById('valorUsuario');
    let numeroUsuario = parseInt(inputElemento.value);

    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > numeroMaximo) {
        asignarTextoElemento('p', 'Por favor, ingresa un número válido entre 1 y 10.');
        return;
    }

    cantidadIntentos++;

    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Ganaste! Adivinaste el número en ${cantidadIntentos} ${(cantidadIntentos === 1) ? 'intento' : 'intentos'}.`);
        document.getElementById('reiniciar').disabled = false;
    } else {
        if (cantidadIntentos < 3) {
            if (numeroUsuario < numeroSecreto) {
                asignarTextoElemento('p', 'El número secreto es mayor. Intenta de nuevo.');
            } else {
                asignarTextoElemento('p', 'El número secreto es menor. Intenta de nuevo.');
            }
        } else {
            asignarTextoElemento('p', `Perdiste. El número secreto era: ${numeroSecreto}`);
            document.getElementById('reiniciar').disabled = false;
        }
    }

    // Limpiar el input después de cada intento
    inputElemento.value = '';
}

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    if (elementoHTML) {
        elementoHTML.innerHTML = texto;
    }
}

function generarNumeroAleatorio() {
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se asignaron todos los números del rango posibles.');
        return null; // Manejo cuando ya no hay números disponibles
    }

    let numeroAleatorio;
    do {
        numeroAleatorio = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroAleatorio));

    listaNumerosSorteados.push(numeroAleatorio);
    
    // Mover console.log después de inicializar la variable
    console.log(numeroAleatorio);
    console.log(listaNumerosSorteados);

    return numeroAleatorio;
}

// Inicializar el primer número secreto solo después de definir la función
numeroSecreto = generarNumeroAleatorio();

function reiniciarJuego() {
    numeroSecreto = generarNumeroAleatorio();
    if (numeroSecreto === null) {
        return; // Evita reiniciar el juego si ya no hay más números disponibles
    }
    cantidadIntentos = 0;
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    document.getElementById('reiniciar').disabled = true;
}

