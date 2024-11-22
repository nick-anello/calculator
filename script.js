/**
 * @fileOverview makes the calculator functional
 */

let displayed, //current displayed value as a string
    lastButton, //last button pressed
    total, //current running total as a number
    operator, //current operation being performed
    operand, //current operand
    memory; //current number stored in memory

//add event listeners for the calculator buttons to handle click
Array.from(document.getElementsByTagName('td')).forEach((button) => {
    button.addEventListener('click', () => {clickButton(button.textContent);});
});

/**
 * Handles a button click
 *
 * @param {string} button - button identifier
 */
function clickButton(button) {
    //if calculator is already on or the on button was clicked, handle the button click
    if (displayed || button === 'ON/C') {
        switch (button) {
            case '0':
            case '1': 
            case '2': 
            case '3': 
            case '4': 
            case '5': 
            case '6': 
            case '7': 
            case '8': 
            case '9': clickNumber(button); break;
            case '+':
            case '-':
            case 'x':
            case '÷': clickOperator(button); break;
            case 'ON/C': clear(); display('0'); break;
            case '=': calculate(); break;
            case '+/-': changeSign(); break;
            case '√': squareRoot(); break;
        }
        lastButton = button;
    }
}

/**
 * Checks if button is a number
 *
 * @param {string} button - button identifier
 */
function isNumber(button) {
    return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(button);
}

/**
 * Checks if button is an operator
 *
 * @param {string} button - button identifier
 */
function isOperator(button) {
    return ['+', '-', 'x', '÷'].includes(button);
}

/**
 * Clears the calculation globals
 */
function clear() {
    total = 0;
    operator = '';
    operand = NaN;
}

/**
 * Handles a number click
 *
 * @param {string} number - number button identifier
 */
function clickNumber(number) {
    //if the last button was a number and display is not "0", append the clicked number to the display
    if (isNumber(lastButton) && +displayed !== 0) {
        display(displayed += number);
    }
    //otherwise, display the clicked number
    else {
        display(number);
    }
    //if last button was an operator, set operator to calculate later
    if (isOperator(lastButton)) {
        operator = lastButton;
    }
    //set the operand to calculate later
    operand = +displayed;
}

/**
 * Handles an operator click
 *
 * @param {string} button - button identifier
 */
function clickOperator(button) {
    //if last button was a number, set the operand and calculate
    if (isNumber(lastButton)) {
        operand = +displayed;
        calculate();
    }
}

/**
 * Handles a change-sign button click
 */
function changeSign() {
    clear();
    //if displayed is not "0", change its sign
    if (+displayed) {
        display((+displayed * -1).toString()); 
    }
}

/**
 * Calculates and displays the current operation
 */
function calculate() {
    if (operator) {
        switch (operator) {
            case '+':
                total += operand; break;
            case '-':
                total -= operand; break;
            case 'x':
                total *= operand; break;
            case '÷':
                total /= operand; break;
        }
        display(total.toString());
    }
    else total = +displayed;
}

/**
 * Displays a number to the calculator screen
 *
 * @param {string} number - number to display
 */
function display(number) {
    document.getElementById('display').textContent = number;
    displayed = number;
}