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
let arr = [];
let listenerActive;
let operatorActive;

let firstNum = 0;
let operator;
let secondNum = 0;
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

    // make number color change when pressing down
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

    // check if number is too long
    if (displayVal.toString().length > 7 || secondNum.toString().length > 7) {
        numbers.forEach(num => {
            num.removeEventListener("click", addToDisplay)
            listenerActive = false;
        });
    }

    if (result) {
        console.log(operatorActive);
        displayVal += e.target.textContent;
        displayVal = +displayVal;
        secondNum = displayVal;
        console.log(secondNum);
        display.textContent = secondNum;
    } else if (operator != undefined) {
        secondNum = secondNum + e.target.textContent;
        secondNum = +secondNum;
        console.log(secondNum);
        console.log(operator);
        display.textContent = secondNum;
    } else {
        displayVal += e.target.textContent;
        firstNum = +displayVal;
        console.log(firstNum);
        arr.push(firstNum);
        display.textContent = firstNum;
    }

}


const operators = document.querySelectorAll(".operator");
operators.forEach(oper => {
    oper.addEventListener("click", (e) => {
        operators.forEach(operat => {
            if (operat.style.opacity == "0.3") {
                operat.style.opacity = "1";
            }
            if (operatorActive == true) {
                result = operate(operator, firstNum, secondNum);
                display.textContent = result;
            }
        });
        operatorActive = true;
        e.target.style.opacity = "0.3";
        //firstNum = displayVal;
        displayVal = 0;
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
    console.log(result);
    display.textContent = result;
    displayVal = 0;
    firstNum = result;
    operatorActive = false;
});

//Function to clear the display
const clear = document.querySelector(".clear-btn");
clear.addEventListener("click", (e) => {
    operatorActive = false;
    displayVal = 0;
    display.textContent = displayVal;
    firstNum = 0;
    operator = undefined;
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