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
                break;
            case "-":
                return subtract(num1, num2);
                break;
            case "*":
                return multiply(num1, num2);
                break;
            case "/":
                return divide(num1, num2);
                break;       
        }
}

let listenerActive;

let firstNum = "";
let operator = "";
let secondNum = "";
let result;
let displayVal = 0;
let display = document.querySelector(".display");
display.textContent = displayVal;

let buttons = document.querySelector("buttons");

let digits = document.querySelectorAll(".digit");
let numbers = document.querySelectorAll(".num");

numbers.forEach(num => {
    num.addEventListener("click", addToDisplay);
    listenerActive = true;
    num.addEventListener("mousedown", (e) => {
        e.target.style.opacity = "0.3";
    });
    num.addEventListener("mouseup", (e) => {
        e.target.style.opacity = "1";
    });
});

function addToDisplay (e) {
    operators.forEach(operat => {
        operat.style.opacity = "1";            
    });
    if (displayVal.toString().length > 7 || secondNum.toString().length > 9) {
        numbers.forEach(num => {
            num.removeEventListener("click", addToDisplay)
            listenerActive = false;
        });
    }

    if (operator != "") {
        secondNum = secondNum + e.target.textContent;
        secondNum = +secondNum;
        console.log(secondNum);
        console.log(operator);
        display.textContent = secondNum;
    } else {
        displayVal += e.target.textContent;
        displayVal = +displayVal;
        console.log(typeof displayVal);
        display.textContent = displayVal;
    }

}


const operators = document.querySelectorAll(".operator");
operators.forEach(oper => {
    oper.addEventListener("click", (e) => {
        operators.forEach(operat => {
            if (operat.style.opacity == "0.3") {
                operat.style.opacity = "1";            }
        });
        e.target.style.opacity = "0.3";
        firstNum = displayVal;
        displayVal = 0;
        console.log(displayVal);
        operator = e.target.textContent.toString();
        numbers.forEach(num => {
            num.addEventListener("click", addToDisplay)
        });
    });
});

const equals = document.querySelector(".equals-btn");
equals.addEventListener("click", (e) => {
    operators.forEach(operat => {
            operat.style.opacity = "1";            
        });
    console.log(firstNum);
    console.log(secondNum);
    result = operate(operator, firstNum, secondNum);
    console.log(typeof firstNum);
    console.log(typeof secondNum);
    console.log(result);
    display.textContent = result;
});

//Function to clear the display
const clear = document.querySelector(".clear-btn");
clear.addEventListener("click", (e) => {
    displayVal = 0;
    display.textContent = displayVal;
    firstNum = 0;
    operator = 0;
    secondNum = 0;
    result = 0;
    operators.forEach(operat => {
        operat.style.opacity = "1";            
    });
    if (listenerActive == false) {
        numbers.forEach(num => {
            num.addEventListener("click", addToDisplay);
            listenerActive = true;
        });
    }
});