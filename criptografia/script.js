// const a_field = document.getElementById("a-field");
var a_field = document.getElementById('a-field');
var b_field = document.getElementById("b-field");
var c_field = document.getElementById("c-field");
var msg_field = document.getElementById("msg-field");
var result_text = document.getElementById("resultado")

function criptografar() {
    let a = parseFloat(a_field.value);
    let b = parseFloat(b_field.value);
    let c = parseFloat(c_field.value);
    let msg = msg_field.value;
    let resultado = criptografarTexto(msg, a, b, c);
    result_text.innerText = resultado;
}

function descriptografar() {
    let a = parseFloat(a_field.value);
    let b = parseFloat(b_field.value);
    let c = parseFloat(c_field.value);
    let msg = msg_field.value;
    let resultado = descriptografarTexto(msg, a, b, c);
    result_text.innerText = resultado;
}

function criptografarTexto(texto, a, b, c) {
    let resultado = "";
    for (let caractere of texto) {
        let x = caractere.charCodeAt(0);
        let y = (a * x * x + b * x + c) % 256; // f(x) = ax²+bx+c
        resultado += String.fromCharCode(y);
    }
    return resultado;
}

function descriptografarTexto(texto, a, b, c) {
    let resultado = "";
    for (let caractere of texto) {
        let y = caractere.charCodeAt(0);
        let x;
        
        if (a != 0) {
            x = (-b + Math.sqrt(b*b - 4*a*(c-y))); // função inversa de f(x) = ax²+bx+c
        } else {
            x = (y - c) / b;
            console.log(x);
        }

        resultado += String.fromCharCode(x);
    }
    return resultado;
}

criptografarTexto("Hello", 0, 0, 0);