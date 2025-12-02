/**
 * Manuel Romo López
 * ID: 00000253080
 */

const NACIONALIDADES_ACEPTADAS = [
    {key: 'AU', name: "Australia"},
    {key: 'BR', name: "Brasil"},
    {key: 'CA', name: "Canadá"},
    {key: 'CH', name: "Suiza"},
    {key: 'DE', name: "Alemania"},
    {key: 'DK', name: "Dinamarca"},
    {key: 'ES', name: "España"},
    {key: 'FI', name: "Finlandia"},
    {key: 'FR', name: "Francia"},
    {key: 'GB', name: "Reino Unido"},
    {key: 'IE', name: "Irlanda"},
    {key: 'IN', name: "India"},
    {key: 'IR', name: "Irán"},
    {key: 'MX', name: "México"},
    {key: 'NL', name: "Países Bajos"},
    {key: 'NO', name: "Noruega"},
    {key: 'NZ', name: "Nueva Zelanda"},
    {key: 'RS', name: "Serbia"},
    {key: 'TR', name: "Turquía"},
    {key: 'UA', name: "Ucrania"},
    {key: 'US', name: "Estados Unidos"},
];

window.onload = function(){
    const form = document.getElementsByTagName("form");

    const inputs = form[0].getElementsByTagName("input");

    const selects = form[0].getElementsByTagName("select");

    for(let input of inputs){

        input.onfocus = resaltarDesresaltar;
        input.addEventListener('blur', resaltarDesresaltar);

        input.addEventListener('input', validarInput);
    }

    for(let select of selects){

        select.onfocus = resaltar;
        select.addEventListener('blur', noResaltar);
    }

    llenarNacionalidad();

}

function llenarNacionalidad(){

    const nacionalidad = document.getElementById("nationality");

    for(let {key, name} of NACIONALIDADES_ACEPTADAS){

        const option = document.createElement("option");
        option.value = key;
        option.innerHTML = name;

        nacionalidad.appendChild(option);
    }

}

function resaltar(evento){

    const elemento = evento.target;
    elemento.classList.add("selected");

    let label = encontrarLabelRelacionado(elemento.id);
    label.classList.add("selected-label");

}

function noResaltar(evento){

    const clase = evento.target.classList.contains("selected");
    if(clase){

        const elemento =  evento.target;
        elemento.classList.remove("selected");

        let label = encontrarLabelRelacionado(elemento.id);
        label.classList.remove("selected-label");

    }
}

function resaltarDesresaltar(evento){

    const elemento = evento.target;
    elemento.classList.toggle("selected");

    let label = encontrarLabelRelacionado(elemento.id);
    label.classList.toggle("selected-label");
}

// Función que permite encontrar el label que apunta al input con el id del parámetro, en su atributo for.
function encontrarLabelRelacionado(idElementoApunta){

    const labels = document.getElementsByTagName("label");
    
    for(let label of labels){
        if(label.getAttribute("for") == idElementoApunta){
            return label;
        }
    }
}

// Función que determina si el texto del input relacionado al evento está vacío, o si contiene caracteres válidos según sea
// la información que representa.
function validarInput(evento){

    // Se obtiene el elemento input y su valor.
    const input = evento.target;
    const textoInput = input.value.trim();

    // Validación de campo vacío:

    // Se determina si ya existe un mensaje antes del elemento input.
    const spanMensaje = input.previousElementSibling;
    
    // Se determina que tipo de mensaje es.
    const esMensajeCampoVacioExiste = spanMensaje && spanMensaje.classList.contains("empty-input-message");
    const esMensajeCaracteresInvalidos = spanMensaje && spanMensaje.classList.contains("invalid-characters-input-message");

    if(textoInput.length == 0){

        // Si el mensaje anterior era de caracteres inválidos, se elimina.
        if (esMensajeCaracteresInvalidos) {
            eliminarSpanMensaje(input, spanMensaje);
        }

        // Si no existe el mensaje sobre campo vacío, se agrega.
        if (!esMensajeCampoVacioExiste) {
            agregarSpanMensaje("Este campo no puede estar vacío.", "empty-input-message", input);
        }

    } else{

        // Se elimina el mensaje de campo vacío si éste existe.
        if (esMensajeCampoVacioExiste) {
            eliminarSpanMensaje(input, spanMensaje);
        }

        // Se realiza la validación de caracteres especiales y numéricos si se trata del nombre o apellido.
        if(input.id == "first-name" || input.id == "last-name"){

            let nombreApellidoValido = validarNombreApellido(textoInput);

            // Se agrega el mensaje de caracteres inválidos si los caracteres son inválidos y si no existía.
            if(!nombreApellidoValido && !esMensajeCaracteresInvalidos){
                agregarSpanMensaje("No se permiten números ni caracteres especiales.", "invalid-characters-input-message", input);

            // Si el nombre o apellido es válido, se elimina el mensaje.
            } else if(nombreApellidoValido && esMensajeCaracteresInvalidos){
                eliminarSpanMensaje(input, spanMensaje);
            }

        }

    }
    
}

// Función que permite añadir un mensaje span antes del elemento input del parámetro, con la clase y el mensaje de los parámetros.
function agregarSpanMensaje(mensaje, clase, elementoInput){

    elementoInput.classList.add("input-error");

    const spanMensajeCampoVacio = document.createElement("span");
    spanMensajeCampoVacio.classList.add(clase);
    spanMensajeCampoVacio.textContent = mensaje;
    
    elementoInput.before(spanMensajeCampoVacio);
}

// Función que permite eliminar el mensaje span del parámetro.
function eliminarSpanMensaje(elementoInput, span){

    elementoInput.classList.remove("input-error");
    span.remove();
}

// Función que valida que los caracteres de un nombre o apellido no sean numéricos ni especiales, pero permite los acentuados.
function validarNombreApellido(nombreApellido) {
    // Se valida el nombre o apellido con una expresión regular;
    const patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return patron.test(nombreApellido);
}