// Declaring global Variables
let numberOne = "NaN";
let numberTwo= "NaN";
let operator;
let answer;
let output = '0';
// A variable used to check if the current state is after evaluating a function
let finished = 0;

//handles non-Numeric unputs
function handleCommand(input) {
    //if the input is an operator eg x / + - 
    if (finished === 0 && input.match(/[\÷\+\-\x]/g)) {
        operator = input;
        //if the first number has not been set set it to the current number
        if (numberOne === "NaN") {
            numberOne = parseFloat(output);
        }
        //remove the event listener so you cant click an operation more than once
        operations.forEach(operation => operation.removeEventListener('click', getInput))
        //set the current number to 0 so the second number can be created
        output = 0;
    //if a non-operator button is clicked and the equation hasnt been evaluated yet
    } else if (finished === 0){
        switch(input){
            //clear all
            case 'AC':
                numberOne = "NaN";
                numberTwo = "NaN";
                operator = undefined;
                output = '0';
                //add event listeners back so that if an equation is aborted with AC a new one can be created
                operations.forEach(operation => operation.addEventListener('click', getInput))
                break;
            //clear current number
            case 'C':
                output = '0';
                break;
            //convert into a percent, idk most calculators have this, seems not very useful
            case '%':
                output = parseFloat(output)/100;
                break;
            //solve the equation!
            case '=':
                //do nothing if an equation has yet to be started
                if (!operator) {
                    return;
                //set the second number and evaluate
                } else {
                    numberTwo = parseFloat(output);
                    doMath();
                    finished = 1;
                }
                //adds back the event listeners so a new equation can be made
                operations.forEach(operation => operation.addEventListener('click', getInput))
                break;
            case '.':
                //if the number is 0 make it 0.
                if (output === '0' || output === 0) {
                    output = '0.';
                //only add a decimal point if the number does not yet have one
                } else if (!output.toString().includes('.')){
                    output += '.';
                }
                break;
        }
    }
    // a limited number of functions which can be done if the equation has already been evaluated
    //all start a new equation from scratch
    else {
        switch(input){
            case 'AC':
                operator = "NaN";
                output = '0';
                break;
            case 'C':
                output = '0';
                break;
            case '.':
                output = '0.';
        }
        // change the check to 0 so a new equation can be started
        finished = 0;
    }
}

//evaluates the given equation
function doMath () {
    switch (operator) {
        case '÷':
            //stops if the user tries to divide by 0
            if (numberTwo === 0) {
                answer = "You can't do that!"
            } else {
                answer = `${numberOne} ${operator} ${numberTwo} = ${(numberOne / numberTwo).toFixed(3)}`;
            }
            break;
        case '+':
            answer = `${numberOne} ${operator} ${numberTwo} = ${(numberOne + numberTwo).toFixed(3)}`;
            break;
        case '-':
            answer = `${numberOne} ${operator} ${numberTwo} = ${(numberOne - numberTwo).toFixed(3)}`;
            break;
        case 'x':
            answer = `${numberOne} ${operator} ${numberTwo} = ${(numberOne * numberTwo).toFixed(3)}`;
            break;
    }
    //resets the values 
    operator = undefined;
    numberOne = "NaN";
    numberTwo = "NaN";
    output = 0;
}

//handles getting the user input and outputing back to the user
function getInput (e) {
    const input  = e.target.textContent;
    if (input >= 0) {
        if (finished === 1) {
            output = input;
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
    //output's the current number to the screen
    screenOutput.textContent = output;
    //out puts parts of the equation as it is built, as well as the anwser once evaluated
    if (answer === "You can't do that!") {
        numberOneOutput.textContent = `${answer}`;
        answer = undefined;
    } else if (answer) {
        numberOneOutput.textContent = answer.replace(/.000/g,'');
        answer = undefined;
    } else if (numberOne !== "NaN" && operator && numberTwo !== "NaN") {
        numberOneOutput.textContent = `${numberOne} ${operator} ${numberTwo}`;
    } else if (numberOne !== "NaN" && operator) {
        numberOneOutput.textContent = `${numberOne} ${operator}`; 
    } else if (numberOne !== "NaN") {
        numberOneOutput.textContent = numberOne;
    } else {
        numberOneOutput.textContent = '';
    }
    //debugging output to watch the variables as the change
    console.log(`output: ${output}`);
    console.log(`operator: ${operator}`);
    console.log(`numberOne: ${numberOne}`);
    console.log(`numberTwo: ${numberTwo}`);
}

//query selectors
const operations = document.querySelectorAll('.operation');
const screenOutput = document.querySelector('.screenOutput');
const numberOneOutput = document.querySelector('.numberOne');
const buttons = document.querySelectorAll('.button');
//adds the inital event listeners to the buttons
buttons.forEach(button => button.addEventListener('click', getInput));