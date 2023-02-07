
function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2    
}

function operate(num1, num2, operator){
    if (operator === 'add'){
        return console.log(add(num1, num2))
    }
    else if (operator === 'subtract'){
        return console.log(subtract(num1, num2))
    }
    else if (operator === 'multiply'){
        return console.log(multiply(num1, num2))
    }
    else if (operator === 'divide'){
        return console.log(divide(num1, num2))
    }
}

let inputNum1 = parseInt(prompt("Enter the first number"));
let inputNum2 = parseInt(prompt("Enter the seccond number"));
let inputOperator = prompt("add/subract/multiply/divide");

operate(inputNum1, inputNum2, inputOperator)