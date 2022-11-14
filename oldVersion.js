
const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');
const clear = document.querySelector('.clear1');
const signs = document.querySelectorAll('.operator');
const equals = document.querySelector('.equal');



let firstNumber = "";
let isFirstNumber = false;

let secondNumber = "";
let isSecondNumber = false;
let sign = "";
let secondSign = "";
let resultNumber = 0;


// ------------------- Displaying value
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let atr = e.target.getAttribute("value");
        if (isFirstNumber == false) {
            getFirstValue(atr)
        }
        if (isSecondNumber == false) {
            getSecondValue(atr);
        }


    });

}



function getFirstValue(first) {
    result.textContent = "";
    firstNumber += first;
    result.textContent = firstNumber;
    firstNumber = +firstNumber;

}

function getSecondValue(second) {
    if (firstNumber != '' && sign != '') {
        secondNumber += second;
        result.textContent = secondNumber;
        secondNumber = +secondNumber;
    }
}

// --------------------

//  CLEAR BUTTON ---------------------------------
clear.addEventListener('click', () => {
    result.textContent = 0;

    firstNumber = "";
    isFirstNumber = false;
    secondNumber = "";
    isSecondNumber = false;
    sign = "";
    resultNumber = 0;





})
// -------------------

// Operate numbers 


function getSign() {
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) => {
            sign = e.target.getAttribute('value');
            isFirstNumber = true;



        })
    }
}

getSign();


// Equal 


equals.addEventListener('click', () => {
    if (sign != "" && secondSign === '') {
        secondSign = sign;
        resultNumber = operate(sign, firstNumber, secondNumber);
        result.textContent = resultNumber;
        firstNumber = resultNumber;
        secondNumber = '';
        if (secondNumber == '') {
            result.textContent = firstNumber;
        }
    } else if (sign != "" && secondSign != '') {
        secondSign = sign;
        resultNumber = operate(secondSign, firstNumber, secondNumber);

        result.textContent = resultNumber;
    }


})
// Operator functions -----------

function operate(operator, a, b) {
    if (operator == "+") {
        return a + b;
    }
    if (operator == '-') {
        return a - b;
    }

    if (operator == 'x') {
        return a * b;
    }

    if (operator == "/") {
        return a / b;
    }

}
//  ------------------------------
