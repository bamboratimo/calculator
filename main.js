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
// check if equals is clicked after operator, so the result is result + operator + result
let resultX2 = false;

let listenerActive = false;
let operatorActive = false;
let minus = false;
let firstNumMinus = "-";
// variable for displaying minus sign if first digit is minus after pressing operator
let showMinusInDisp = false;
let equalClicked = false;
let moi = false;

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
        moi = true;
    } else if (result !== "") {
        displayVal += e.target.textContent;
        console.log("moi");
        displayVal = +displayVal;
        secondNum = displayVal;
        display.textContent = secondNum;
        firstNum = result;
    } else if (operator != "") {
        secondNum = secondNum + e.target.textContent;
        secondNum = +secondNum;
        display.textContent = secondNum;
        displayVal = "";
    } else {
        firstNum += e.target.textContent;
        firstNum = +firstNum;
        display.textContent = firstNum;
        displayVal = "";
    }
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
            if (moi == true) {
                secondNum = "";
                displayVal = "";
                operator = "";
                console.log(firstNum, secondNum);
                equalClicked = false;
                result = false;
                moi = false;
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
                    moi = false;

                    firstNum = "";
                    operator = "";
                    secondNum = "";
                    result = "";
                    displayVal = "";
                }
                console.log(firstNum);
                console.log(secondNum);
                console.log(result);
                //result = result.toString().substring(0, 9);
                //result = +result;
                //display.textContent = result;
            }

        //});
        resultX2 = true;
        minus = false;
        operatorActive = true;
        e.target.style.opacity = "0.3";
        displayVal = 0;
        operator = e.target.textContent.toString();
        numbers.forEach(num => {
            num.addEventListener("click", addToDisplay);
        });
    }


const equals = document.querySelector(".equals-btn");
equals.addEventListener("click", (e) => {
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
        displayVal = 0;
        resultX2 = false;
    } else {
        display.textContent = "Error";
        listenerActive = false;
        operatorActive = false;
        minus = false;
        firstNumMinus = "-";
        showMinusInDisp = false;
        equalClicked = false;
        moi = false;

        firstNum = "";
        operator = "";
        secondNum = "";
        result = "";
        displayVal = "";
    }
    console.log(result);
    /*result = result.toString().substring(0, 9);
    result = +result;
    display.textContent = result;
    firstNum = result;
    operatorActive = false;
    equalClicked = true;
    displayVal = 0;
    resultX2 = false;*/
});

//Function to clear the display
const clear = document.querySelector(".clear-btn");
clear.addEventListener("click", (e) => {
    display.textContent = 0;
    listenerActive = false;
    operatorActive = false;
    minus = false;
    firstNumMinus = "-";
    showMinusInDisp = false;
    equalClicked = false;
    moi = false;

    firstNum = "";
    operator = "";
    secondNum = 0;
    result = 0;
    displayVal = 0;
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