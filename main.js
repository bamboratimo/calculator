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

function operatorsNormalOpacity(e) {
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
let listenerActive = false; //a variable to disable eventlistener on numbers
let operatorActive = false; // check if operator button is clicked
let minus = false; //check if minus is clicked as a first number
let equalClicked = false; //check if equals button is clicked
let startOver = false; //a variable to determine if a whole new calculation should start after clicking equals button

let firstNum = "";
let operator = "";
let secondNum = "";
let result = "";
let displayVal = "";
let display = document.querySelector(".display");
display.textContent = 0;

let decimal = document.querySelector(".decimal-btn");
let buttons = document.querySelector("buttons");
let digits = document.querySelectorAll(".digit");
let numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");

// activate eventListener for numbers
numbers.forEach(num => {
    num.addEventListener("click", clickNumber);
    listenerActive = true;

    // make a number color change when pressing down
    num.addEventListener("mousedown", targetLessOpacity);
    num.addEventListener("mouseup", targetNormalOpacity);
});

decimal.addEventListener("click", addDecimal);

decimal.addEventListener("mousedown", targetLessOpacity);
decimal.addEventListener("mouseup", targetNormalOpacity);

function addToDisplay() {
    display.textContent = displayVal;
}

function clickNumber (e) {
    if (displayVal === "0") {
        displayVal = "";
    }
    operatorsNormalOpacity();
    if (minus == true) {
        displayVal += e.target.textContent;
        display.textContent = displayVal;
        firstNum = +displayVal;
    } else if (result != "" && equalClicked == true) {
        displayVal += e.target.textContent;
        firstNum = +displayVal;
        startOver = true;
    } else if (result !== "") {
        displayVal += e.target.textContent;
        secondNum = +displayVal;
        firstNum = result;
    } else if (operator !== "") {
        displayVal += e.target.textContent;
        secondNum = +displayVal;
    } else {
        displayVal += e.target.textContent;
        firstNum = +displayVal;
    }
    switchOperator = false;
    resultX2 = false;
    addToDisplay();

    // check if displaytext is too long
    if (display.textContent.length >= 9) {
        numbers.forEach(num => {
            num.removeEventListener("click", clickNumber)
            listenerActive = false;
        });
    }
}
//add eventListeners for operator buttons
operators.forEach(oper => {
    oper.addEventListener("click", clickOperator);
});

function clickOperator (e) {
    equalClicked = false;
    if (e.target.textContent != "-" && firstNum === "") {
        return;
    }
    if (minus == true) {
        displayVal = "-" + displayVal;
        display.textContent = displayVal;
        firstNum = +displayVal;
    }

    if (e.target.textContent == "-" && firstNum === "") {
        targetLessOpacity(e);
        minus = true;
        return;
    }
    operators.forEach(operat => {
        if (operat.style.opacity == "0.3") {
            operatorsNormalOpacity();
        }
    });

    if (startOver === true) {
        secondNum = "";
        displayVal = "";
        operator = "";
        equalClicked = false;
        result = "";
        startOver = false;
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
            result = result.toString().substring(0, 9);
            result = +result;
            display.textContent = result;
        } else {
            clearScreen();
            return;
        }
    }
    switchOperator = true;
    operator = e.target.textContent.toString();
    resultX2 = true;
    minus = false;
    operatorActive = true;
    targetLessOpacity(e);
    displayVal = "";
    numbers.forEach(num => {
        num.addEventListener("click", clickNumber);
    });
};

function addDecimal(e) {
    operatorsNormalOpacity();
    if (displayVal.includes(".")) {
        return;
    }
    if (display.textContent == result || display.textContent === "0" || (operatorActive == true && secondNum == "")) {
        displayVal = "0.";
        addToDisplay();
        console.log("niina");
        return;
    }
    displayVal += e.target.textContent;
    firstNum = +displayVal;
    addToDisplay();
}

const equals = document.querySelector(".equals-btn");
equals.addEventListener("click", clickEquals);

function clickEquals(e) {
    operatorsNormalOpacity();
    
    if (secondNum === "") {
        result = operate(operator, firstNum, firstNum);
    }
    else if (resultX2 === true) {
        result = operate(operator, result, result)
    } else {
        result = operate(operator, firstNum, secondNum);
    }
    
    // check if dividing with zero and reset everything if that's the case
    if (result != "Infinity") {
        // check if pressing equals before giving secondNum
        if(secondNum === "") {
            result = firstNum;
            console.log("kkkk");
        }
        result = result.toString().substring(0, 9);
        result = +result;
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
function clearScreen(e) {
    if(result == "Infinity") {
        display.textContent = "Error";
    } else {
        display.textContent = 0;
    }
    listenerActive = false;
    operatorActive = false;
    minus = false;
    firstNumMinus = "-";
    equalClicked = false;
    startOver = false;

    firstNum = "";
    operator = "";
    secondNum = "";
    result = "";
    displayVal = "";
    operators.forEach(operat => {
        operat.style.opacity = "1";
    });
    if (listenerActive == false) {
        numbers.forEach(num => {
            num.addEventListener("click", clickNumber);
            listenerActive = true;
        });
    }
};