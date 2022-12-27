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
let switchOperator = false; // a variable to not calculate result if switching from one operator to another
let resultX2 = false; //check if equals is clicked after operator, so the result is result + operator + result

let listenerActive = false; //a variable to disable eventlistener on numbers
let operatorActive = false; // check if operator button is clicked
let minus = false; //check if minus is clicked as a first number
let firstNumMinus = "-"; //add a minus sign in front of a first number if minus is active
let showMinusInDisp = false; //a variable for displaying minus sign if first digit is minus after pressing operator
let equalClicked = false; //check if equals button is clicked
let startOver = false; //a variable to determine if a whole new calculation should start after clicking equals button

let firstNum = "";
let operator = "";
let secondNum = "";
let result = "";
let displayVal = "";
let display = document.querySelector(".display");
display.textContent = 0;

let buttons = document.querySelector("buttons");

let digits = document.querySelectorAll(".digit");
let numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");

// activate eventListener for numbers
numbers.forEach(num => {
    num.addEventListener("click", addToDisplay);
    listenerActive = true;


    // make a number color change when pressing down
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
     if (minus == true) {
        firstNumMinus += e.target.textContent;
        display.textContent = firstNumMinus.substring(1);
        firstNum = +firstNumMinus;
        console.log(firstNumMinus);
        showMinusInDisp = true;
        minus = false;
    } else if (result != "" && equalClicked == true) {
        displayVal = displayVal + e.target.textContent;
        firstNum = +displayVal;
        display.textContent = firstNum;
        startOver = true;
    } else if (result !== "") {
        displayVal += e.target.textContent;
        displayVal = +displayVal;
        secondNum = displayVal;
        display.textContent = secondNum;
        firstNum = result;
    } else if (operator !== "") {
        console.log("hei");
        secondNum = secondNum + e.target.textContent;
        secondNum = +secondNum;
        display.textContent = secondNum;
        displayVal = "";
    } else {
        firstNum += e.target.textContent;
        firstNum = +firstNum;
        display.textContent = firstNum;
        console.log(firstNum);
        displayVal = "";
    }
    switchOperator = false;
    resultX2 = false;

    // check if displaytext is too long
    if (display.textContent.length >= 9) /*|| secondNum.toString().length >= 9)*/ {
        numbers.forEach(num => {
            num.removeEventListener("click", addToDisplay)
            listenerActive = false;
        });
    }
}

        operators.forEach(oper => {
            oper.addEventListener("click", clickOperator);
        });

        function clickOperator (e) {
            equalClicked = false;
            if (e.target.textContent != "-" && firstNum === "") {
                return;
            }
        if (showMinusInDisp == true) {
            display.textContent = firstNumMinus;
            showMinusInDisp = false;
        }

        if (e.target.textContent == "-" && firstNum === "") {
            e.target.style.opacity = 0.3;
            minus = true;
            console.log("raiia");
            return;
        }
        operators.forEach(operat => {
            if (operat.style.opacity == "0.3") {
                operat.style.opacity = "1";
            }
        });
            if (startOver === true) {
                secondNum = "";
                displayVal = "";
                operator = "";
                console.log(firstNum, secondNum);
                equalClicked = false;
                result = "";
                startOver = false;
            }

            if (switchOperator == true) {
                operator = e.target.textContent.toString();
                e.target.style.opacity = 0.3;
                return;
            }

            if (operatorActive == true && secondNum !== "") {
                console.log(secondNum);
                result = operate(operator, firstNum, secondNum);

                // check if dividing with zero and reset everything if that's the case
                if (isFinite(result)) {
                    result = result.toString().substring(0, 9);
                    result = +result;
                    display.textContent = result;
                } else {
                    display.textContent = "Error";
                    listenerActive = false;
                    operatorActive = false;
                    minus = false;
                    firstNumMinus = "-";
                    showMinusInDisp = false;
                    equalClicked = false;
                    startOver = false;

                    firstNum = "";
                    operator = "";
                    secondNum = "";
                    result = "";
                    displayVal = "";
                    return;
                }
            }
            switchOperator = true;
            operator = e.target.textContent.toString();
            resultX2 = true;
            minus = false;
            operatorActive = true;
            e.target.style.opacity = "0.3";
            displayVal = 0;
            numbers.forEach(num => {
            num.addEventListener("click", addToDisplay);
        });
    }


const equals = document.querySelector(".equals-btn");
equals.addEventListener("click", clickEquals);

    function clickEquals(e) {
    operators.forEach(operat => {
            operat.style.opacity = "1";            
        });
    console.log(firstNum);
    console.log(secondNum);
    if (secondNum === "") {
        result = operate(operator, firstNum, firstNum);
    }
    else if (resultX2 === true) {
        result = operate(operator,result, result)
    } else {
    result = operate(operator, firstNum, secondNum);
    }

    // check if dividing with zero and reset everything if that's the case
    if (isFinite(result)) {
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
        display.textContent = "Error";
        listenerActive = false;
        operatorActive = false;
        minus = false;
        firstNumMinus = "-";
        showMinusInDisp = false;
        equalClicked = false;
        startOver = false;

        firstNum = "";
        operator = "";
        secondNum = "";
        result = "";
        displayVal = "";
    }
}


const clear = document.querySelector(".clear-btn");
clear.addEventListener("click", clearScreen);

//Function to clear the display
    function clearScreen(e) {
    display.textContent = 0;
    listenerActive = false;
    operatorActive = false;
    minus = false;
    firstNumMinus = "-";
    showMinusInDisp = false;
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
            num.addEventListener("click", addToDisplay);
            listenerActive = true;
        });
    }
};