/**
 * 2c = tewo of clubs (treboles)
* 2d = two of diamonds (diamantes)
* 2h = two of hearts (corazones)
* 2s = two of spades (espadas)
 */

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];    

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias HTML 
const btnPedir             = document.querySelector('#btnPedir');
const btnPlantarse         = document.querySelector('#btnPlantarse');
const btnNuevo             = document.querySelector('#btnNuevo');
const divCartasJugador     = document.querySelector('#jugador-cartas'); //contenedor cartas jugador
const divCartasComputadora = document.querySelector('#Computadora-cartas'); //contenedor cartas computadora
const puntosHTML           = document.querySelectorAll('small');  // selecciona todos los small para puntajes

// Esta función crea un nuevo deck
const crearDeck = () => {

for (let i = 2; i <= 10; i++) {
for (let tipo of tipos) {
    deck.push(i + tipo);
}
}

for (let tipo of tipos) {
for (let esp of especiales) {
    deck.push(esp + tipo);
}
}

//console.log( deck ); // Muestra el deck sin mezclar
deck = _.shuffle( deck );
console.log( deck );
return deck;
}

crearDeck();

// Esta función me permite tomar una carta
const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta; }


//pedirCarta();

const valorCarta = ( carta ) => {
const valor = carta.substring(0, carta.length -1 );  
//let puntos = 0;  
//console.log({valor}); proceso para ver el valor de la carta con el numero 10
//if ( isNaN( valor ) ) {
    //puntos = ( valor === 'A' ) ? 11 : 10;
    
    //} else {                        * Manera de hacer que funcione 1*
    
    //puntos = valor * 1;
    //}
    //console.log(puntos);
// Manera de hacer que funcione 2* Ternario
return ( isNaN( valor ) ) ?
        ( valor === 'A' ) ? 11 : 10 
        : valor * 1;

}
const valor = valorCarta( pedirCarta() );
//console.log({valor}); removido para evitar muchos clg 

                    //turnos de la computadora//*/*/*/*/*/--*//
const turnoComputadora = ( puntosMinimos ) => {

do {
const carta = pedirCarta();
puntosComputadora = puntosComputadora + valorCarta( carta );
puntosHTML[1].innerText = puntosComputadora;
// <img class="carta" src
const imgCarta = document.createElement('img');
imgCarta.src = `cartas/cartas/${ carta }.png`;  // ruta de la carta
imgCarta.classList.add('carta');  // agrega la clase carta
divCartasComputadora.append( imgCarta ) ; // agrega la carta al div

if ( puntosMinimos > 21 ) {
    break;
}
} while ( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ) );

setTimeout(() => {   // tiempo para que se vea la ultima carta
// Mensajes de victoria
    if ( puntosComputadora === puntosMinimos ) {
    alert('Nadie gana :(');

    } else if ( puntosMinimos > 21 ) {
    alert('Computadora gana');   

    } else if ( puntosComputadora > 21 ) {
    alert('Tu ganas!');
    
    } else {
    alert('Computadora gana');
    }

    }, 100 );// fin del time Out linea 102

}


//Eventos

btnPedir.addEventListener('click', () => {  //Boton pedir carta
const carta = pedirCarta();
puntosJugador = puntosJugador + valorCarta( carta );
puntosHTML[0].innerText = puntosJugador;
// <img class="carta" src
const imgCarta = document.createElement('img');
imgCarta.src = `cartas/cartas/${ carta }.png`;  // ruta de la carta
imgCarta.classList.add('carta');  // agrega la clase carta

divCartasJugador.append( imgCarta ) ; // agrega la carta al div

//sistema de puntos y mensajes
if ( puntosJugador > 21 ) {
    console.warn('Lo siento mucho, perdiste');
    btnPedir.disabled = true;
    

    turnoComputadora( puntosJugador );
} else if ( puntosJugador === 21 ) {
    console.warn('21, genial!');
    btnPedir.disabled = true; 
    btnPlantarse.disabled = true;  
    turnoComputadora( puntosJugador );
}
});

btnPlantarse.addEventListener('click', () => { //Boton plantarse
btnPedir.disabled = true;
btnPlantarse.disabled = true;
turnoComputadora( puntosJugador ); 

});

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnPlantarse.disabled = false;

});