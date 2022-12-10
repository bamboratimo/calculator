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
console.log(operate("*", 5, 2));

let displayVal = "0";
let display = document.querySelector(".display");
display.textContent = displayVal;

let buttons = document.querySelector("buttons");

let digits = document.querySelectorAll(".digit");
let numbers = document.querySelectorAll(".num");

numbers.forEach(num => {
    num.addEventListener("click", addToDisplay)
});

function addToDisplay (e) {
    if (displayVal === "0") {
        displayVal = "";
    }
    displayVal += e.target.textContent;
    display.textContent = displayVal
}


