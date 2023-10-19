function calcular(){
    const coefA = document.getElementById("coeficienteA").value;
    const coefB = document.getElementById("coeficienteB").value;
    const coefC = document.getElementById("coeficienteC").value;
    
    if (coefA == "" || coefB == "" || coefC == ""){
        alert("Preencha todos os coeficientes!")
        return;
    }

    c1 = parseFloat(coefA);
    c2 = parseFloat(coefB);
    c3 = parseFloat(coefC);

    if (c1 == 0 || c2 == 0 || c3 == 0){
        alert("Nenhum dos coeficientes pode ser zero!");
        return;
    }

    let r1;
    let r2;
    let solucao;

    delta = c2*c2 - 4 * c1 * c3;
    
    if (delta == 0){
        r1 = -c2 / (2 * c1);
        r2 = r1;

        // solucao = "Xn = C1 * " + r1 + "^n + " + "C2 * n" + r2 + "^n";
        solucao = `Xn = C1 *  ${r1}^n + C2 * n*${r2} ^n`;
        document.getElementById("delta-neg").hidden = true;
    }
    if (delta > 0){
        r1 = (-c2 + Math.sqrt(delta))/ (2 * c1);
        r2 = (-c2 - Math.sqrt(delta))/ (2 * c1);

        // solucao = "Xn = C1 * " + r1 + "^n + " + "C2 * " + r2 + "^n";
        solucao = `Xn = C1*${r1}^n + C2*${r2}^n`;
        document.getElementById("delta-neg").hidden = true;
    }
    if (delta < 0){
        let real = -c2 / (2 * c1);
        let imaginaria = Math.sqrt(Math.abs(delta)) / (2 * c1);

        angulo = Math.atan(real / imaginaria).toFixed(5);
        modulo = Math.sqrt(Math.pow(real, 2) + Math.pow(imaginaria, 2)).toFixed(0);

        // solucao = "Xn = " + modulo + "^n * [ K1 * cos(n * " + angulo + ") + "
        // + "K2 * sen(n * " + angulo + ")]";

        solucao = `Xn = ${modulo}^n * [ K1 * cos(n * ${angulo}) + K2 * sen(n * ${angulo} )]`;
        document.getElementById("delta-neg").hidden = false;
    }

    document.getElementById("solucao").textContent = solucao;
}

