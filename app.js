//VARIABLES
// reasignar document a una variable para simplificar código
let d = document;

// llamar a la función que genera el numero aleatorio
let numeroSecreto = 0;

// contador de intentos
let contador = 0;

//lista de números sorteados
let listaNumerosSorteados = [];

//cantidad maxima de números sorteados
let numeroMaximo = 10;

//intentos máximos
let intentos = 3;

/* let title = document.querySelector("h1");
title.innerText = "Juego de adivinar el número";

let info = document.getElementsByClassName("texto__párrafo")[0];
info.innerText = "Introduce un número entre 1 y 10";
*/

// simplificación de las lineas anteriores, haciendo el código reutilizable a través de una función
function asignarTextoElemento(etiqueta, texto) {
  let elementoHTML = d.querySelector(etiqueta);
  elementoHTML.innerText = texto;
  return;
}

// función para generar un numero aleatorio entre 1 y 10
function generarNumeroAleatorio() {
  //si ya sorteamos todos los números
  if (listaNumerosSorteados.length >= numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles.");
    return null;
  }

  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  if (listaNumerosSorteados.includes(numeroGenerado)) {
    //Si el numero generado esta incluido en la lista, hacemos operación
    //sino, hacemos otra cosa
    return generarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
  }
}

//limitar numero de intentos
function intentosMax() {
  if (contador >= intentos) {
    asignarTextoElemento(
      "p",
      `Has alcanzado el número máximo de intentos, los cuales eran ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }.`
    );
    d.getElementById("reiniciar").removeAttribute("disabled");
    // reiniciarJuego();
  }
}

// función para verificar si el número introducido por el usuario es igual al número secreto
function verificarIntento() {
  let numeroUsuario = parseInt(document.getElementById("numeroUsuario").value);

  if (numeroUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `¡Acertaste el número en ${contador} ${
        contador === 1 ? "intento" : "intentos"
      }!`
    );
    d.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    // Usuario no acertó
    if (numeroUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El número es menor");
    } else {
      asignarTextoElemento("p", "El número es mayor");
    }
    contador++;
    limpiarCampo();
    intentosMax();
  }
  return;
}

// limpiar campo de texto en caso de no acertar el numero
function limpiarCampo() {
  // let valorCampo = (d.querySelector("#numeroUsuario").value = "");
  // return;
  d.querySelector("#numeroUsuario").value = "";
}

// condiciones iniciales del juego
// genera el numero aleatorio
// inicializa el contador
function condicionesIniciales() {
  asignarTextoElemento("h1", "Adivina el número secreto");
  asignarTextoElemento(
    "p",
    `Introduce un número entre el 1 y el ${numeroMaximo}. Tienes ${intentos} intentos.`
  );
  contador = 0;
  numeroSecreto = generarNumeroAleatorio();
}

// reiniciar el juego
function reiniciarJuego() {
  // limpiar campo de texto
  limpiarCampo();
  // Indicar mensaje de intervalo de números
  // Generar nuevo numero aleatorio
  // Inicializar contador
  condicionesIniciales();
  //Deshabilitar botón nuevo juego
  d.querySelector("#reiniciar").setAttribute("disabled", true);
}

// console.log(numeroSecreto);
condicionesIniciales();
