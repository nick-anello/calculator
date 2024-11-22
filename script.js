/**
 * @fileOverview logic for the calculator
 */

let displayed, //current displayed value as a string
    lastButton, //last button pressed
    total, //current running total as a number
    operator, //current operation being performed
    operand, //current operand
    memory; //current number stored in memory

document.getElementById('ON/C').addEventListener('click', () => {
    if (!displayed) {
        //add event listeners to handle button clicks
        document.querySelectorAll('td').forEach((td) => {
            td.addEventListener('click', () => {
                const button = td.textContent;
                //if button is a number
                if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(button)) {
                    display(+displayed ? displayed + button : button);
                }
                else if (['+', '-', 'x', '÷'].includes(this.textContent)) {

                }
                else if (this.textContent === '=') {

                }
            });
        });
    }
    display('0');
});

/**
 * Displays a number to the calculator screen
 *
 * @param {string} number - number to display
 */
function display(number) {
    document.getElementById('display').textContent = number;
    displayed = number;
}