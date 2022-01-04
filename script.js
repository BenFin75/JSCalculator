let numberOne;
let numberTwo;
let operator;
let answer;
let finished = 0;
let output = '0';

function handleCommand(input) {
    if (finished === 0 && input.match(/[\÷\+\-\x]/g)) {
        operator = input;
        if (!numberOne) {
            numberOne = parseFloat(output);
        } else {
            numberTwo = parseFloat(output);
        }
        output = 0;
    } else if (finished === 0){
        switch(input){
            case 'AC':
                numberOne = undefined;
                numberTwo = undefined;
                operator = undefined;
                output = '0';
                break;
            case 'C':
                output = '0';
                break;
            case '%':
                if (!numberOne){
                    numberOne = parseFloat(output)/100;
                    output = 0;
                } else {
                    numberTwo = parseFloat(output)/100;
                    output = 0;
                }
                break;
            case '=':
                if (output.toString().includes('%')) {
                    output = numberOne.toString();
                } else if (numberOne && !numberTwo) {
                    numberTwo = parseFloat(output);
                    doMath();
                    finished = 1;
                } else {
                    doMath();
                    finished = 1;
                }
                break;
            case '.':
                if (output === '0' || output === 0) {
                    output = '0.';
                } else if (!output.toString().includes('.')){
                    output += '.';
                }
                break;
        }
    }
    else {
        switch(input){
            case 'AC':
                operator = undefined;
                output = '0';
                break;
            case 'C':
                output = '0';
                break;
            case '.':
                output = '0.';
        }
        numberOne = undefined;
        numberTwo = undefined;
        finished = 0;
    }
}

function doMath () {
    switch (operator) {
        case '÷':
            if (numberTwo === 0) {
                answer = "You can't do that!"
            } else {
                answer = ` = ${(numberOne / numberTwo).toFixed(3)}`;
            }
            break;
        case '+':
            answer = ` = ${(numberOne + numberTwo).toFixed(3)}`;
            break;
        case '-':
            answer = ` = ${(numberOne - numberTwo).toFixed(3)}`;
            break;
        case 'x':
            answer = ` = ${(numberOne * numberTwo).toFixed(3)}`;
            break;
    }
    output = 0;
}

function getInput (e) {
    const input  = e.target.textContent;
    if (input >= 0) {
        if (finished === 1) {
            output = input;
            numberOne = undefined;
            numberTwo = undefined;
            finished = 0;
        } else if (output === "0.") {
            output += input;
        } else if (output == 0 || isNaN(output)) {
            output = input;
        } else if (output.length <= 15) {
            output += input;
        }
    } else {
        handleCommand(input)
    }
    screenOutput.textContent = output;
    if (answer === "You can't do that!") {
        numberOneOutput.textContent = `${answer}`;
        answer = undefined;
    } else if (numberOne && operator && numberTwo && answer ) {
        numberOneOutput.textContent = `${numberOne} ${operator} ${numberTwo} ${answer.replace(/.000/g,'')}`;
    } else if (numberOne && operator && numberTwo) {
        numberOneOutput.textContent = `${numberOne} ${operator} ${numberTwo}`;
    } else if(numberOne && operator) {
        numberOneOutput.textContent = `${numberOne} ${operator}`; 
    } else {
        numberOneOutput.textContent = numberOne;}
    console.log(`output: ${output}`);
    console.log(`operator: ${operator}`);
    console.log(`numberOne: ${numberOne}`);
    console.log(`numberTwo: ${numberTwo}`);
}


const screenOutput = document.querySelector('.screenOutput');
const numberOneOutput = document.querySelector('.numberOne');
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', getInput));