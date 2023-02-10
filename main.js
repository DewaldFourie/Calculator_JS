
// Functions for mathematical calculations
function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2)
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2)
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2)
}

function divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2)    
}

// Operate function, to determine which function to implement
function operate(num1, operator, num2){
    if (operator === 'add'){
        return add(num1, num2)
    }
    if (operator === 'subtract'){
        return subtract(num1, num2)
    }
    if (operator === 'multiply'){
        return multiply(num1, num2)
    }
    if (operator === 'divide'){
        return divide(num1, num2)
    }
}

const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.buttons')
const display = document.querySelector('.display')


// Event listener to apply javascript to 'clicks'
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        // if user clicked a number
        if (!action) {
            console.log('number key!')
            calculator.dataset.previousKeyType = 'number';
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = keyContent;
            }
            else{
                display.textContent = displayedNum + keyContent;
            }
        }

        // if user clicked an operator
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'){
            console.log('operator key');

            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType!== 'calculate'){
                const calcValue = operate(firstValue, operator, secondValue);
                function isDecimal (result){
                    return result % 1;
                }
                if (!isDecimal(calcValue)){
                    display.textContent = calcValue;
                }
                else {
                    display.textContent = calcValue.toFixed(3);
                } 
                calculator.dataset.firstValue = calcValue;    
            }
            else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add('is-pressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }

        // if user clicked the decimal point
        if (action === 'decimal') {
            console.log('decimal key!');
            if (!displayedNum.includes('.')){
                display.textContent = displayedNum + '.';
            } 
            else if(previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal';
          }
          
        // if user clicked the clear button, if true, reset the calculator
        if (action === 'clear') {
            console.log('clear key!');
            if (key.textContent === 'AC'){
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
            }
            else {
                key.textContent = 'AC'
            }

        display.textContent = '0'
            calculator.dataset.previousKeyType = 'clear'
          }

        if (action !== 'clear'){
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
          
        // if user clicked the equal sign
        if (action === 'calculate') {
            console.log('equal key!');
            
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator
            const secondValue = displayedNum;

            if (firstValue){
                if (previousKeyType === 'calculate'){
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }

                if(secondValue === '0' && operator === 'divide'){
                    alert("Oh no you didn't")
                }
                else{
                    result = operate(firstValue, operator, secondValue)
                    function isDecimal (result){
                        return result % 1;
                    }
                    if (!isDecimal(result)){
                        display.textContent = result
                    }
                    else {
                        display.textContent = result.toFixed(3)
                    }
                }
            }
            
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
          }

    
        // remove the 'is-pressed' class for buttons pressed  
        Array.from(key.parentNode.children)       
                .forEach(k => k.classList.remove('is-pressed'))
    }
})

