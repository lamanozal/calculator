"use strict";

const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

const calculate = (first, second, operator) => {
    let result = 0;

    switch (operator) {
        case '+':
            result = first + second;
            break;
        case '-':
            result = first - second;
            break;
        case '*':
            result = first * second;
            break;
        case '/':
            result = first / second;
            break;
        default:
            result = second;
            break;
    }

    return result;
}

const handleOperator = nextOperator => {

    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    const value = parseFloat(displayValue);

    if(firstValue === null) {
        firstValue = value;
    }
    else if(operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = parseFloat(result.toFixed(7));
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
}

const clear = () => {
  displayValue = '0';
}

const inputDecimal = () => {
    if(displayValue.includes('.')) return;

    if(waitingForSecondValue) {
        clear();
        waitingForSecondValue = false;
    }

    displayValue += '.';
}

const inputNumber = num => {
    if(waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    }
    else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

const updateDisplay = () => {
  display.value = displayValue;
}

updateDisplay();

keys.addEventListener('click', e => {
    const el = e.target;
    const value = el.value;

    if(!el.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(value);
    }

    updateDisplay();
});