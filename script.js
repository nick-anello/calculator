/**
 * @fileOverview logic for the calculator
 */

let displayed, //current displayed value as a number
    lastButton, //last button pressed
    total, //current running total as a number
    operator, //current operation being performed
    operand, //current operand
    memory; //current number stored in memory

//add event listener to the 'ON/C' button to turn on the calculator
document.getElementById('ON/C').addEventListener('click', () => {
    //if calculator is off, turn it on and add button handlers
    if (!displayed) {
        //add event listeners to handle button clicks
        document.querySelectorAll('td').forEach((td) => {
            td.addEventListener('click', clickHandler);
        });
    }
    lastButton = 'ON/C';
    clear();
});

/**
 * Handle button clicks
 */
function clickHandler() {
    const button = this.textContent;
    //if button is a number
    if (isNumber(button)) {
        //if '0' is not displayed, append the total
        //if the last button was a number and 0 is not displayed, append the clicked number to the display
        if ((isNumber(lastButton) || lastButton === '+/-') && displayed !== 0) {
            if (displayed.toString().length < 8) display(+(displayed.toString() + button));
        }
        //otherwise, display the clicked number
        else {
            display(+button);
        }
        //if last button was an operator, set operator to calculate later
        if (isOperator(lastButton)) {
            operator = lastButton;
        }
        //set the operand to calculate later
        operand = displayed;
    }
    //else if button is an operator
    else if (isOperator(button)) {
        //if lastButton was a number, complete the pending calculation
        if (isNumber(lastButton)) {
            operand = displayed;
            calculate();
        }
    }
    //else if button is equals
    else if (button === '=') {
        calculate();
    }
    //else if button is '+/-'
    else if (button === '+/-') {
        //if displayed is not '0'
        if (displayed) {
            //if last button was not an operator or equals
            if (isOperator(lastButton) || lastButton === '=') {
                //reset operator to prevent calculation
                operator = '';
            }
            display(displayed * -1);
            operand = displayed;
            //if not making an operation, set total
            if (!operator) total = displayed;
        }
    }
    //else if button is '√'
    else if (button === '√') {
        if (displayed > 0) {
            const sqrt = Math.sqrt(displayed);
            total = sqrt;
            operator = '';
            display(sqrt);
        }
        else clear();
    }
    //else if button is '%'
    else if (button === '%') {
        const percent = displayed / 100;
        total = percent;
        operator = '';
        display(percent);
    }
    //set last button after handling button click
    lastButton = button;
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
 * Calculates and displays the current operation
 */
function calculate() {
    //if making an operation
    if (operator) {
        //do the operation and display the result
        switch (operator) {
            case '+':
                total += operand; break;
            case '-':
                total -= operand; break;
            case 'x':
                total *= operand; break;
            case '÷':
                if (operand === 0) {
                    return errorState('∞spooky∞');
                }
                else total /= operand; break;
        }
        display(total);
    }
    //else set the total
    else total = +displayed;
}

function clear() {
    total = 0;
    operator = '';
    operand = NaN;
    display(0);
}

/**
 * Displays a number to the calculator screen
 *
 * @param {number} number - number to display
 */
function display(number) {
    try {
        let string = number.toString();
        if (string.includes('e')) throw new Error('overflow');
        const numParts = string.split('.');
        if (numParts.length === 2) {
            //if first part of number is greater than 8 digits, it will not fit on the screen
            if (numParts[0].length > 8) throw new Error('overflow');
            //if first part of number is 8 or 7 digits, exclude '.x' which will not fit on the screen
            if (numParts[0].length > 6) string = numParts[0];
            else {
                //if first part of number is 6 or less digits, round the decimal and trim trailing zeros
                string = number.toFixed(7 - numParts[0].length).replace(/0+$/, '');
            }
        }
        //if there is no decimal and the string is greater than 8 digits, it will not fit on the screen
        else if (string.length > 8) throw new Error('overflow');
        document.getElementById('display').textContent = string;
        displayed = number;
    }
    catch (error) {
        errorState(error.message);
    }
}

/**
 * Enters error state
 * Calculator can be reset with the 'ON/C' button
 *
 * @param {string} message - message to display
 */
function errorState(message) {
    displayed = NaN;
    total = 0;
    operator = '';
    operand = NaN;
    document.getElementById('display').textContent = message;
    //remove event listeners - they can be reenabled with the 'ON/C' button
    document.querySelectorAll('td').forEach((td) => {
        td.removeEventListener('click', clickHandler);
    });
}