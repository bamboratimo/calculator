function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);

        case "*":
            return multiply(num1, num2);

        case "/":
            return divide(num1, num2);    
        }
}

function operatorsNormalOpacity() {
    operators.forEach(operat => {
    operat.style.opacity = "1";            
});
}

function targetLessOpacity(e) {
    return e.target.style.opacity = "0.3";
}
function targetNormalOpacity(e) {
    return e.target.style.opacity = "1";
}
let switchOperator = false; // a variable to not calculate result if switching from one operator to another
let resultX2 = false; //check if equals is clicked after operator, so the result is result + operator + result
let operatorActive = false; // check if operator button is clicked
let equalClicked = false; //check if equals button is clicked

let firstNum = "";
let operator = "";
let secondNum = "";
let result = "";
let displayVal = "";
const decimal = document.querySelector(".decimal-btn");
const buttons = document.querySelector("buttons");
const digits = document.querySelectorAll(".digit");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const percent = document.querySelector(".percent-btn");

display.textContent = 0;

// activate eventListener for numbers
numbers.forEach(num => {
    num.addEventListener("click", clickNumber);

    // make a number color change when pressing down
    num.addEventListener("mousedown", targetLessOpacity);
    num.addEventListener("mouseup", targetNormalOpacity);
});

decimal.addEventListener("click", addDecimal);

decimal.addEventListener("mousedown", targetLessOpacity);
decimal.addEventListener("mouseup", targetNormalOpacity);

percent.addEventListener("click", addPercent);

percent.addEventListener("mousedown", targetLessOpacity);
percent.addEventListener("mouseup", targetNormalOpacity);

function addToDisplay() {
    display.textContent = displayVal;
}

function clickNumber (e) {
    if (displayVal === "0") {
        displayVal = "";
    }
    if (displayVal.length < 9) {
        operatorsNormalOpacity();
        displayVal += e.target.textContent;
        if (result != "" && equalClicked == true) {
            firstNum = +displayVal;
        } else if (result !== "") {
            secondNum = +displayVal;
            firstNum = result;
        } else if (firstNum !== "") {
            secondNum = +displayVal;
        } else {
            firstNum = +displayVal;
        }
        switchOperator = false;
        resultX2 = false;
        addToDisplay();
    }
}

//add eventListeners for operator buttons
operators.forEach(oper => {
    oper.addEventListener("click", clickOperator);
});

function clickOperator (e) {
    operatorsNormalOpacity();
    if (equalClicked === true) {
        secondNum = firstNum;
        displayVal = "";
        result = "";
    }
    if (switchOperator == true) {
        operator = e.target.textContent.toString();
        targetLessOpacity(e);
        return;
    }

    if (operatorActive == true && secondNum !== "") {
        result = operate(operator, firstNum, secondNum);
        // check if dividing with zero and reset everything if that's the case
        if (result != "Infinity") {
            result = +result.toString().substring(0, 9);
            display.textContent = result;
            console.log(firstNum, secondNum);
        } else {
            clearScreen();
            return;
        }
    }
    equalClicked = false;//
    switchOperator = true;
    operator = e.target.textContent.toString();
    resultX2 = true;
    operatorActive = true;
    targetLessOpacity(e);
    displayVal = "";
};

function addDecimal(e) {
    resultX2 = false;
    operatorsNormalOpacity();
    if (displayVal.includes(".")) {
        return;
    }
    displayVal += e.target.textContent;
    if (displayVal == "." && secondNum == "") {
        displayVal = "0.";
        secondNum = +displayVal;
    }
    addToDisplay();
}

function addPercent() {
    operatorsNormalOpacity();
    displayVal = displayVal / 100;
    if (+display.textContent === result) {
        displayVal = result;
        displayVal = displayVal / 100;
        addToDisplay();
    }
    if (result != "" && equalClicked == true) {
        firstNum = +displayVal;
    } else if (result !== "") {
        secondNum = +displayVal;
        firstNum = result;
    } else if (operator !== "") {
        secondNum = +displayVal;
    } else {
        firstNum = +displayVal;
    }
    switchOperator = false;
    resultX2 = false;
    addToDisplay();
}

const equals = document.querySelector(".equals-btn");
equals.addEventListener("click", clickEquals);

function clickEquals() {
     if(secondNum === "") {
        secondNum = firstNum;
    }
    if (operator === "") {
        result = +displayVal;
        return;
    }
    equalClicked = false;
    operatorsNormalOpacity();
    if (resultX2 === true) {
        result = operate(operator, firstNum, firstNum);
        console.log("rieska");
    } else {
        result = operate(operator, firstNum, secondNum);
        console.log("päsl");
    }

    // check if dividing with zero and reset everything if that's the case
    if (result != "Infinity") {
        // check if pressing equals before giving secondNum
        console.log(firstNum, secondNum, result);
        result = +result.toString().substring(0, 9);
        display.textContent = result;
        firstNum = result;
        operatorActive = false;
        equalClicked = true;
        displayVal = "";
        resultX2 = false;
        switchOperator = false;
    } else {
        clearScreen();
    }
}

const clear = document.querySelector(".clear-btn");
clear.addEventListener("click", clearScreen);

//Function to clear the display
function clearScreen() {
    if(result == "Infinity") {
        display.textContent = "Error";
    } else {
        display.textContent = 0;
    }
    operatorActive = false;
    equalClicked = false;

    firstNum = "";
    operator = "";
    secondNum = "";
    result = "";
    displayVal = "";
    operatorsNormalOpacity();
};