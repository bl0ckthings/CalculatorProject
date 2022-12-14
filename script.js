const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');
const clear = document.querySelector('.clear1');
const signs = document.querySelectorAll('.operator');
const equals = document.querySelector('.equal');
const dot = document.querySelector('.dot');





let displayValue = "0";
let firstNumber = "";
let secondNumber = "";

let firstOperator = "";
let secondOperator = "";

let resultNumber = 0;

// Cette fonction me sert à mettre à jour ma valeur d'affichage, j'ai juste à l'appeler pour update
function updateDisplay() {
    result.textContent = displayValue;
    if (displayValue.length > 9) {
        result.textContent = displayValue.substring(0, 9);
    }
    if (displayValue.includes('.') == true) {


        dot.disabled = true;
    } else {
        dot.disabled = false;
    }



}
updateDisplay();

// ------------------- Displaying value
// Ici for loop classique pour récuperer la valeur du button sur lequel je click et update le display.
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let atr = e.target.getAttribute("value");
        if (firstNumber == "") {
            getFirstValue(atr)
            updateDisplay();

        } else {
            getSecondValue(atr);
            updateDisplay();


        }

    });

}


// Une fonction qui me permet de récuperer mon premier nombre
function getFirstValue(first) {
    if (displayValue === 0 || displayValue === '0') {
        displayValue = first;
    } else if (displayValue == firstNumber) {
        displayValue = first
    } else {
        // cette partie permet d'ajotuer à la chaine mes chiffres pour les rendres en nombres,
        // Si on retire le "+" un seul nombre sera affiché à la fois.
        displayValue += first;
    }




}

// Pareil pour la seconde valeur (qui va après un signe (addition, soustraction etc..))
function getSecondValue(second) {
    if (firstOperator != '') {
        if (displayValue == firstNumber) {
            displayValue = second;
        } else {
            displayValue += second;
        }
    }

}

// --------------------

// Get the operator and calculate
// Cette loop + event a le même principe que celle des nombres, récuperer la valeur du button sur lequel j'appuie mais pour les 
// Signes !
for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener('click', () => {
        getSolution(signs[i].value);
        updateDisplay();

    })
}

// La fonction la plus importante ! 
function getSolution(sign) {
    if (firstOperator != "" && secondOperator === '') {
        secondOperator = sign; // le signe qui sera selectionné est stocké dans cette var
        secondNumber = displayValue; // Je veux que mon second nombre soit affiché avant mon calcul
        resultNumber = operate(Number(firstNumber), Number(secondNumber), firstOperator); // Mon calcul
        displayValue = round(resultNumber, 7); // Mon résultat du calcul ci dessus affiché.
        firstNumber = displayValue; // C'est ici que tout ce joue :
        // Je redéfinis ma variable qui stockait mon résultat du calcul en tant que premier nombre
        // pour pouvoir répeter l'opération sans forcément créer une variable 3eme nombre, 4eme nombre etc etc ...
        resultNumber = ""; // Je remet à 0 mon résultat final car c'est à présent mon premier nombre :)

    } else if (firstOperator !== '' && secondOperator != "") {
        // Grosso modo la même chose mais pour la seconde opération enchainée. Une fois celle ci effectuée , l'explication du dessus se répète.

        secondNumber = displayValue;
        resultNumber = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        secondOperator = sign;
        displayValue = round(resultNumber, 7);
        firstNumber = displayValue;
        resultNumber = "";

    } else {
        firstOperator = sign;
        firstNumber = displayValue;
    }
}
// -----------------------
// Equal button
// Mon Button égale pour afficher mon résultat
equals.addEventListener('click', () => {
    equal();
    updateDisplay();
})

function equal() {
    if (firstOperator == '') {
        displayValue = displayValue;

    } else if (secondNumber != '') {
        secondNumber = displayValue;
        resultNumber = round(operate(Number(firstNumber), Number(secondNumber), secondOperator), 7);
        displayValue = resultNumber;
        firstNumber = displayValue;
        secondNumber = "";
        firstOperator = "";
        resultNumber = "";
    } else {
        secondNumber = displayValue;
        displayValue = round(operate(Number(firstNumber), Number(secondNumber), firstOperator), 7);
        firstNumber = displayValue;
        secondNumber = "";
        firstOperator = "";
        resultNumber = "";

    }

}



// ROUND FUNCTION

function round(number, decimals) {
    return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
}

//  CLEAR BUTTON ---------------------------------
clear.addEventListener('click', () => {
    clearDisplay();
    updateDisplay();

});

function clearDisplay() {
    displayValue = '0';

    firstNumber = "";
    secondNumber = "";
    firstOperator = "";
    secondOperator = "";
    resultNumber = "";
}

// Operator functions -----------

function operate(a, b, operator) {
    if (operator === "+") {
        return a + b;
    }
    else if (operator === '-') {
        return a - b;
    }

    else if (operator === 'x') {
        return a * b;
    }

    else if (operator === "/") {
        if (b === 0) {
            return 'no bro'
        } else {

            return a / b;
        }


    }

}

