var a_field = document.getElementById('a-field');
var b_field = document.getElementById("b-field");
var c_field = document.getElementById("c-field");
var msg_field = document.getElementById("msg-field");
var result_text = document.getElementById("resultado");
var result_numbers = document.getElementById("numeros");

let inputCharTable = [];

for (let i = 0; i < 256; i++) {
    inputCharTable.push(String.fromCharCode(i));
}

console.log("Tamanho tabela:", inputCharTable.length);

function modulo(x, m) {
    // Calcular resto positivo da divisão
    return ((m + x % m) % m);
}

function generateEncryptedTable(a, b, c) {
    let encryptedTable = [];

    for (let char of inputCharTable) {
        let x = inputCharTable.indexOf(char);
        let y = modulo((a * x * x + b * x + c), inputCharTable.length);
        encryptedTable.push(inputCharTable[y]);
    }

    return encryptedTable;
}

function encryptText(text, a, b, c) {
    let encryptedTable = generateEncryptedTable(a, b, c);
    // let result = "";
    let result = []

    for (let char of text) {
        let i = inputCharTable.indexOf(char);
        let y = encryptedTable[i];
        let y_index = inputCharTable.indexOf(y);
        // result += y;
        result.push(y_index);
    }

    return result;
}

function decryptText(text, a, b, c) {
    let encryptedTable = generateEncryptedTable(a, b, c);
    // let result = "";
    let result = []

    for (let char of text) {
        let i = encryptedTable.indexOf(char);
        let x = inputCharTable[i];
        
        // result += x;
        result.push(i);
    }

    return result;
}

function numberArrayToString(numbers) {
    let result = "";
    for (let n of numbers) {
        console.log(n, "'" + inputCharTable[n] + "'");
        result += inputCharTable[n];
    }
    return result;
}

function checkFunction(a, b, c) {
    // Verificar se a função dada é inversível

    let encryptedTable = generateEncryptedTable(a, b, c);
    let valid = true;
    console.log(encryptedTable);
    for (let char of encryptedTable) {
        let n = encryptedTable.filter(c => c === char).length;
        if (n > 1) {
            console.log("Caractere repetido:", char, "; quantidade de repetições:", n);
            valid = false;
        }
    }

    return valid;
}

function check(a, b, c) {
    // Verificar se é possível inverter a função
    if (isNaN(a) || a == undefined) {
        alert("Preencha o campo A.");
        return false ;
    }
    
    if (isNaN(b) || b == undefined) {
        alert("Preencha o campo B.");
        return false ;
    }
    
    if (isNaN(c) || c == undefined) {
        alert("Preencha o campo C.");
        return false ;
    }

    if (a == 0 && b == 0) {
        alert("Informe uma função váida.");
        return false;
    }
    
    if (!checkFunction(a, b, c)) {
        alert("A função não inversível");
        return false;
    }

    return true;
}

function encrypt() {
    let a = parseFloat(a_field.value);
    let b = parseFloat(b_field.value);
    let c = parseFloat(c_field.value);
    let msg = msg_field.value;

    if (!check(a, b, c)) {
        return;
    }

    // Mostrar resultado
    let result = encryptText(msg, a, b, c);
    result_numbers.innerHTML = `<strong>[${result.join(', ')}]</strong>`;
    result_text.innerHTML = `<strong>${numberArrayToString(result)}</strong>`;
    // result_text.innerText = result;
}

function decrypt() {
    let a = parseFloat(a_field.value);
    let b = parseFloat(b_field.value);
    let c = parseFloat(c_field.value);
    let msg = msg_field.value;

    // Verificar se é possível inverter a função
    if (!check(a, b, c)) {
        return;
    }

    // Mostrar resultado
    let result = decryptText(msg, a, b, c);
    result_numbers.innerHTML = `<strong>[${result.join(', ')}]</strong>`;
    result_text.innerHTML = `<strong>${numberArrayToString(result)}</strong>`;
    // result_text.innerText = result;
    
}
