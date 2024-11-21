/**
 * @fileOverview makes the calculator functional
 */

let displayed, //current displayed value as a string
    total, //current running total as a number
    lastButton, //last button pressed
    operator, //current operation being performed
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
    if (lastButton || button === 'ON/C') {
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
            case '÷': changeOperator(button); break;
            case 'ON/C': clear(); break;
            case '=': calculate(); break;
            case '+/-': changeSign(); break;
            case '√': squareRoot(); break;
        }
        lastButton = button;
    }
}

/**
 * Clears the calculator or turns it on
 */
function clear() {
    total = 0;
    operator = '';
    display('0');
}

/**
 * Handles a number click
 *
 * @param {string} number - number button identifier
 */
function clickNumber(number) {
    //
    if (+lastButton || (+lastButton === 0 && +displayed !== 0)) {
        display(displayed += number);
    }
    else {
        display(number);
    }
}

/**
 * Handles an operator click
 *
 * @param {string} button - button identifier
 */
function changeOperator(button) {
    total = +displayed;
    calculate();
    operator = button;
}

/**
 * Handles a change-sign button click
 */
function changeSign() {
    if (+displayed) {
        display((+displayed * -1).toString()); 
    }
}

/**
 * Handles a sqaureroot button click
 */
function squareRoot() {
    total = 0;
    if (+displayed > 0) display(Math.sqrt(+displayed).toString());
}

/**
 * Calculates and displays the current operation
 */
function calculate() {
    if (operator) {
        switch (operator) {
            case '+':
                total = total + +displayed; break;
            case '-':
                total = total - +displayed; break;
            case 'x':
                total = total * +displayed; break;
            case '÷':
                total = total / +displayed; break;
        }
        display(total.toString());
    }
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