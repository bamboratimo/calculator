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
    num.addEventListener("click", () => {
        clickNumber(num.textContent);
    });

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
    display.textContent = displayVal.toString().substring(0, 9);
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

function clickNumber (num) {
    if (displayVal === "0") {
        displayVal = "";
    }
    if (displayVal.toString().length < 9) {
        operatorsNormalOpacity();
        displayVal += num;
        //displayVal += e.target.textContent;
        displayValToNums();
        operatorActive = false;
        addToDisplay();
        document.activeElement.blur();
    }
}

//add eventListeners for operator buttons
operators.forEach(oper => {
    oper.addEventListener("click", () => {
        clickOperator(oper.textContent);
        oper.style.opacity = "0.3";
    });
});

function clickOperator (oper) {
    operatorsNormalOpacity();
    if (equalClicked === true) {
        secondNum = firstNum;
        displayVal = "";
        result = "";
    }
    if (operatorActive) {
        operator = oper;
        console.log(operator);
        return;
    }
    if (equalClicked === false && secondNum !== "") {
        result = operate(operator, firstNum, secondNum);
        // check if dividing with zero and reset everything if that's the case
        if (result != "Infinity") {
            result = +result.toString().substring(0, 9);
            display.textContent = result;
        } else {
            clearScreen();
            return;
        }
    }
    equalClicked = false;
    operator = oper;
    operatorActive = true;
    //targetLessOpacity(e);
    displayVal = "";
};

function addDecimal() {
    operatorsNormalOpacity();
    if (displayVal.includes(".")) {
        return;
    }

    displayVal += ".";
    if ((displayVal == "." && secondNum === "") || equalClicked === true) {
        displayVal = "0.";
    }

    operatorActive = false;
    addToDisplay();
}

function addPercent() {
    operatorsNormalOpacity();
    if (operatorActive === true) {
        displayVal = display.textContent / 100;
        displayValToNums();
        addToDisplay();
        operatorActive = false;
        return;
    }
     if (display.textContent !== "0") {
        if (display.textContent == firstNum.toString().substring(0, 9) && displayVal === "") {
            firstNum = firstNum / 100;
            display.textContent = firstNum.toString().substring(0, 9);
            displayVal = "";
            operator = "";
            return;
        } 
        if (firstNum != "") {
            displayVal = displayVal / 100;
            displayValToNums();
            addToDisplay();
        }
    }
}

const plusMinus = document.querySelector(".plus-minus-btn");
plusMinus.addEventListener("click", addPlusMinus);
plusMinus.addEventListener("mousedown", targetLessOpacity);
plusMinus.addEventListener("mouseup", targetNormalOpacity);

function addPlusMinus() {
    if (operatorActive) {
        display.textContent = "-0";
        displayVal = "-";
        return;
    }

    //change minus or not after pressing equals
    operatorsNormalOpacity();
    if (equalClicked === true) {
        if (firstNum.toString().includes("-")) {
            firstNum = firstNum.toString().substring(1);
        } else {
            firstNum = "-" + firstNum;
        }
        firstNum = +firstNum;
        display.textContent = firstNum;
        return;
    }
    if  (display.textContent === "0") {
        display.textContent = "-0"
        displayVal = "-";
        return;
    } else if (display.textContent === "-0") {
        display.textContent = "0"
        displayVal = "";
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

const backspace = document.querySelector(".backspace-btn");
backspace.addEventListener("mousedown", targetLessOpacity);
backspace.addEventListener("mouseup", targetNormalOpacity);
backspace.addEventListener("click", useBackspace);

function useBackspace() {
    if((equalClicked === true && displayVal == "") || display.textContent === "0") {
        return;
    }
    if (displayVal.length === 1 || displayVal === "-0") {
        displayVal = "";
        display.textContent = "0";
        return;
    } else if (displayVal.length === 2 && displayVal.includes("-")) {
        displayVal = "-";
        display.textContent = "-0";
        return;
    }
        displayVal = displayVal.slice(0, -1);
        displayValToNums();
        addToDisplay();
}

const equals = document.querySelector(".equals-btn");
equals.addEventListener("click", clickEquals);
equals.addEventListener("mousedown", targetLessOpacity);
equals.addEventListener("mouseup", targetNormalOpacity);

function clickEquals() {
    operatorsNormalOpacity();
    //to allow clicking equals right at the start
    if (firstNum === "") {
        return;
    }
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
        console.log(firstNum, secondNum, result, operator, displayVal, display.textContent);//
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

//keyboard support
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "Enter":
            clickEquals();
            break;

        case ".":
            addDecimal();
            break;

        case "Backspace":
            useBackspace();
            break;

        case "c":
            clearScreen();
            break;

        case "%":
            addPercent();
            break;

        case "1":
            clickNumber("1");
            break;

        case "2":
            clickNumber("2");
            break;

        case "3":
            clickNumber("3");
            break;

        case "4":
            clickNumber("4");
            break;

        case "5":
            clickNumber("5");
            break;

        case "6":
            clickNumber("6");
            break;

        case "7":
            clickNumber("7");
            break;

        case "8":
            clickNumber("8");
            break;

        case "9":
            clickNumber("9");
            break;

        case "0":
            clickNumber("0");
            break;

        case "+":
            clickOperator("+");
            break;

        case "-":
            clickOperator("-");
            break;

        case "/":
            clickOperator("/");
            break;

        case "*":
            clickOperator("*");
            break;
        }
});