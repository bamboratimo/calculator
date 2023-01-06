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

function displayValToNums() {
    if (result != "" && equalClicked == true) {
        firstNum = +displayVal;
    } else if (result !== "") {
        secondNum = +displayVal;
        firstNum = result;
    } else if (operator != "") {
        secondNum = +displayVal;
    } else {
        firstNum = +displayVal;
    }
}


function clickNumber (e) {
    if (displayVal === "0") {
        displayVal = "";
    }
    if (displayVal.toString().length < 9) {
        operatorsNormalOpacity();
        displayVal += e.target.textContent;
        displayValToNums();
        operatorActive = false;
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
    if (operatorActive) {
        operator = e.target.textContent;
        targetLessOpacity(e);
        return;
    }
    if (equalClicked == false && secondNum !== "") {
        result = operate(operator, firstNum, secondNum);
        // check if dividing with zero and reset everything if that's the case
        if (result != "Infinity") {
            console.log("määä");
            result = +result.toString().substring(0, 9);
            display.textContent = result;
        } else {
            clearScreen();
            return;
        }
    }
    equalClicked = false;
    operator = e.target.textContent.toString();
    operatorActive = true;
    targetLessOpacity(e);
    displayVal = "";
};

function addDecimal(e) {
    operatorsNormalOpacity();
    if (displayVal.includes(".")) {
        return;
    }

    displayVal += e.target.textContent;
    if (displayVal == "." && secondNum === "") {
        displayVal = "0.";
    }

    operatorActive = false;//
    addToDisplay();
}

function addPercent() {
    if (firstNum != "") {
        operatorsNormalOpacity();
        displayVal = displayVal / 100;
        if (+display.textContent === result) {
            displayVal = result;
            displayVal = displayVal / 100;
            addToDisplay();
        }
        displayValToNums();
        addToDisplay();
    }
}

const plusMinus = document.querySelector(".plus-minus-btn");
plusMinus.addEventListener("click", addPlusMinus);
plusMinus.addEventListener("mousedown", targetLessOpacity);
plusMinus.addEventListener("mouseup", targetNormalOpacity);

function addPlusMinus() {
    if (operatorActive === true) {
        display.textContent = "-0"
        displayVal = "-";
        return;
    }

    if (display.textContent === "0") {
        displayVal = "-";
        display.textContent = "-0";
        console.log(displayVal);
        return;
    } else if (display.textContent === "-0") {
        displayVal = "";
        display.textContent = "0";
        console.log("kakka");
        return;
    }


    if (displayVal.toString().includes("-")) {
        displayVal = displayVal.substring(1);
    } else {
        displayVal = "-" + displayVal;
    }
    displayValToNums()
    addToDisplay();
}

const equals = document.querySelector(".equals-btn");
equals.addEventListener("click", clickEquals);
equals.addEventListener("mousedown", targetLessOpacity);
equals.addEventListener("mouseup", targetNormalOpacity);

function clickEquals() {
    //to allow clicking equals right at the start
    if (firstNum === "") {
        return;
    }
    operatorsNormalOpacity();
    if(secondNum === "" && operatorActive == true) {
        secondNum = firstNum;
    }
    if (operator === "") {
        result = +displayVal;
        return;
    }
    if (operatorActive) {
        result = operate(operator, firstNum, firstNum);
    }else {
        result = operate(operator, firstNum, secondNum);
    }
    // check if dividing with zero and reset everything if that's the case
    if (result != "Infinity") {
        // check if pressing equals before giving secondNum
        result = +result.toString().substring(0, 9);
        display.textContent = +result;
        firstNum = result;
        operatorActive = false;
        equalClicked = true;
        displayVal = "";
    } else {
        clearScreen();
    }
}

const clear = document.querySelector(".clear-btn");
clear.addEventListener("click", clearScreen);
clear.addEventListener("mousedown", targetLessOpacity);
clear.addEventListener("mouseup", targetNormalOpacity);

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