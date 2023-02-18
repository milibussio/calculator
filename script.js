// Variables para los calculos

let valor1 = "";
let valor2 = "";
let operador = "";
let resultado = "";

// Para activar botones con teclado

window.addEventListener('keydown', function(e){
    const tecla = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(!tecla) return;
    tecla.classList.add('tocando');
    this.setTimeout(function(){tecla.classList.remove('tocando')}, 100);

    // para borrar
    
    if (tecla.textContent == "AC"){borrar();};

    // para guardar operador

    if (esOperador(tecla.textContent)){guardarOperador(tecla.textContent);};

    // para completar valores 1 y 2

    if(!isNaN(tecla.textContent)){guardarValor(tecla.textContent);};

    // para resultado

    if (tecla.textContent == "="){calcularResultado();};

    // para porcentaje

    if (tecla.textContent == "%"){calcularPorcentaje()};

    // control

    console.log("valor 1: ", valor1, "valor 2: ", valor2, "operador: ", operador, "resultado: ", resultado);

});

// Para activar botones mouse

window.addEventListener('click', function(e){
    const tecla = document.querySelector(`button[id="${e.target.id}"]`);
    if(!tecla) return;

    // para borrar
    
    if (tecla.textContent == "AC"){borrar();};

    // para guardar operador

    if (esOperador(tecla.textContent)){guardarOperador(tecla.textContent);};

    // para completar valores 1 y 2

    if(!isNaN(tecla.textContent)){guardarValor(tecla.textContent);};

    // para resultado

    if (tecla.textContent == "="){calcularResultado();};

    // para mas menos

    if(tecla.textContent == "+/-"){positivoNegativo();};

    // para porcentaje

    if (tecla.textContent == "%"){calcularPorcentaje()};

    // control
    
    console.log("valor 1: ", valor1, "valor 2: ", valor2, "operador: ", operador, "resultado: ", resultado);

});

// Para cambiar valor mostrado en pantalla

function cambiarPantalla(valor) {
    const pantalla = document.querySelector('.pantalla');
    if (!valor || valor.toString().length <= 22){
        pantalla.textContent = valor;
    } else {
        pantalla.textContent = "number is too big :(";
    }
};

// Para borrar pantalla

function borrar (){
    valor1 = "";
    valor2 = "";
    operador = "";
    resultado = "";

    cambiarPantalla();
 };

// Para guardar valor 1 y valor 2

function guardarValor(seleccion){
    
    if(!operador && resultado){
        borrar();
    }

    if (!operador && !resultado){

        if((!valor1 && seleccion != 0) || valor1){

        valor1 = valor1 + seleccion; 
        cambiarPantalla(valor1);
              
        }
        if (seleccion == "." && !valor1.includes(".")){
            valor1 = valor1 + seleccion; 
            cambiarPantalla(valor1);
      }

    } else {

        if((valor2[0] != 0) || (valor2[0] == 0 && seleccion != 0) || (valor2[1] && valor2[1] != 0)){
            valor2 = valor2 + seleccion; 
            cambiarPantalla(valor2);    
        }
        
        if (seleccion == "." && !valor2.includes(".")){
            valor2 = valor2 + seleccion; 
            cambiarPantalla(valor2);
      }
    }};  

// Para ver si es operador

function esOperador(seleccion){

    if (seleccion == "+" || seleccion == "-" || seleccion == "/" || seleccion == "*"){
        return true; }};

// Para guardar operador 

function guardarOperador(seleccion){

    if (!valor1){
        operador = "";
    } else if ((valor1 && !operador)||((valor1 && operador) && !valor2)){
        operador = seleccion;
    } else if ((valor1 && operador) && valor2){
        calcularResultado();
        operador = seleccion;
    }
};

//

function calcularResultado(){

    if (operador == "+"){
        resultado = parseFloat(valor1) + parseFloat(valor2); 
    }
    if (operador == "-"){
        resultado = parseFloat(valor1) - parseFloat(valor2); 
    }
    if (operador == "/"){
        if (valor2 != 0){
        resultado = parseFloat(valor1) / parseFloat(valor2); 
        } else {resultado = "ಠ_ಠ"}
    }
    if (operador == "*"){
        resultado = parseFloat(valor1) * parseFloat(valor2); 
    }

    if (!isNaN(resultado)){
        resultado = Math.round(resultado * 100000 + Number.EPSILON) / 100000;
        cambiarPantalla(resultado);        
    } else {
        cambiarPantalla(resultado);
        resultado = "";
    }

    if (resultado == 0){
        valor1 = "";
    } else {
        valor1 = resultado.toString();
    }

    valor2 = "";
    operador = "";
    
};

// Para cambiar de positivo a negativo

function positivoNegativo (){

    if (valor2 == ""){
        valor1 = valor1*-1;
        valor1 = valor1.toString();
        cambiarPantalla(valor1);
    } else {
        valor2 = valor2*-1;
        valor2 = valor2.toString();
        cambiarPantalla(valor2);
    }
};

// Para porcentaje

function calcularPorcentaje(){
    
    const pantalla = document.querySelector('.pantalla');
    let porc = pantalla.textContent;    
    resultado = parseFloat(porc) / 100;
    resultado = Math.round(resultado * 100000 + Number.EPSILON) / 100000;

    valor2 = "";
    operador = "";

    if (resultado == 0){
        valor1 = "";
        cambiarPantalla("number to small :(");
    } else {
        valor1 = resultado;
        cambiarPantalla(resultado);
    }
};