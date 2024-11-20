let displayed,
    total,
    lastButton,
    operator,
    memory;

Array.from(document.getElementsByTagName('td')).forEach((button) => {
    button.addEventListener('click', () => {clickButton(button.textContent);});
});

function clickButton(button) {
    if (lastButton || button === 'ON/C') {
        switch (button) {
            case 'ON/C': clear(); break;
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
            case '=': calculate(); break;
            case '+/-': changeSign(); break;
            case '√': squareRoot(); break;
        }
        lastButton = button;
    }
}

function clear() {
    total = 0;
    operator = '';
    display('0');
}

function clickNumber(number) {
    if (+lastButton || +lastButton === 0) {
        display(displayed += number);
    }
    else {
        display(number);
    }
}

function changeOperator(button) {
    total = +displayed;
    calculate();
    operator = button;
}

function changeSign() {
    if (+displayed) {
        display((+displayed * -1).toString()); 
    }
}

function squareRoot() {
    total = 0;
    if (+displayed > 0) display(Math.sqrt(+displayed).toString());
}

function calculate() {
    if (operator) {
        let newTotal;
        switch (operator) {
            case '+':
                newTotal = total + +displayed; break;
            case '-':
                newTotal = total - +displayed; break;
            case 'x':
                newTotal = total * +displayed; break;
            case '÷':
                newTotal = total / +displayed; break;
            default:
                newTotal = total;
        }
        total = newTotal;
        display(newTotal.toString());
    }
}

function display(number) {
    document.getElementById('display').textContent = number;
    displayed = number;
}