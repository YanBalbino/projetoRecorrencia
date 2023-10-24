var a_field = document.getElementById('a-field');
var b_field = document.getElementById("b-field");
var c_field = document.getElementById("c-field");
var msg_field = document.getElementById("msg-field");
var result_text = document.getElementById("resultado");
var result_numbers = document.getElementById("numeros");

var kValues, values;
let inputCharTable = [];

// for (let i = 32; i <= 126; i++) {
//     inputCharTable.push(String.fromCharCode(i));
// }
// for (let i = 130; i <= 140; i++) {
//     inputCharTable.push(String.fromCharCode(i));
// }
// for (let i = 145; i <= 148; i++) {
//     inputCharTable.push(String.fromCharCode(i));
// }
// for (let i = 150; i <= 156; i++) {
//     inputCharTable.push(String.fromCharCode(i));
// }
// for (let i = 159; i <= 159; i++) {
//     inputCharTable.push(String.fromCharCode(i));
// }
// for (let i = 161; i <= 255; i++) {
//     inputCharTable.push(String.fromCharCode(i));
// }

for (let i = 0; i < 256; i++) {
    inputCharTable.push(String.fromCharCode(i));
}

function encrypt() {
    let a = parseFloat(a_field.value);
    let b = parseFloat(b_field.value);
    let c = parseFloat(c_field.value);
    let msg = msg_field.value;
  
    if (a === 0 && b === 0) {
        alert('Informe uma função váida.');
        return;
    } else if (msg === "") {
        alert('A mensagem está vazia.');
        return;
    } 
    
    let result = encryptText(msg, a, b, c);
    msg = result[0];
    kValues = result[1];
    values = result[2];

    result_text.innerHTML = `<strong>${msg}</strong>`
}

function decrypt() {
    let a = parseFloat(a_field.value);
    let b = parseFloat(b_field.value);
    let c = parseFloat(c_field.value);
    let msg = msg_field.value;

    if (msg != "") {
        let result = decryptText(msg, a, b, c);
        result_text.innerHTML = result;
    }
}

function encryptText(msg, a, b, c) {
    let result = "";
    kValues = new Array(msg.length);
    values = new Array(msg.length);

    for (let i = 0; i < msg.length; i++) {
        let x = inputCharTable.indexOf(msg[i]);
        let y = (a*x*x)+(b*x)+(c);

        kValues[i] = Math.floor(y / inputCharTable.length);
        values[i] = y - kValues[i] * inputCharTable.length;
        result += inputCharTable[values[i]];
    }

    return [result, kValues, values];
}

function decryptText(msg, a, b, c) {
  let result = "";

  for (let i = 0; i < msg.length; i++) {
    let x = values[i] + kValues[i] * inputCharTable.length;
    let delta = b*b - 4*a*(c-x);
    let sqrt_delta = Math.sqrt(delta);

    if (a === 0) {
        x = (x - c) / b;
    }
    
    if (a > 0) {
        x = (-b + sqrt_delta) / (2*a);
    }
      
    if (a < 0) {
        x =  (-b - sqrt_delta) / (2*a);
    }

    result += inputCharTable[x];
  }

  return result;
}