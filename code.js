document.getElementById("totalMarksBySpace").addEventListener("click", function () {
    document.getElementById('logoId').textContent = 'Marks Calculator'
    hideAllContent();
    closeMenu();
    document.getElementById("totalMarksBySpaceContent").style.display = "block";
});

document.getElementById("totalMarksByTime").addEventListener("click", function () {
    document.getElementById('logoId').textContent = 'Marks Calculator'
    hideAllContent();
    closeMenu();
    document.getElementById("totalMarksByTimeContent").style.display = "block";
});

document.getElementById("positionInClass").addEventListener("click", function () {
    document.getElementById('logoId').textContent = 'Position Finder'
    hideAllContent();
    closeMenu();
    document.getElementById("positionInClassContent").style.display = "block";
});

document.getElementById("percentageOfTotalMarks").addEventListener("click", function () {
    document.getElementById('logoId').textContent = 'Percentage Finder'
    hideAllContent();
    closeMenu();
    document.getElementById("percentageOfTotalMarksContent").style.display = "block";
});

function hideAllContent() {
    document.getElementById("totalMarksBySpaceContent").style.display = "none";
    document.getElementById("totalMarksByTimeContent").style.display = "none";
    document.getElementById("positionInClassContent").style.display = "none";
    document.getElementById("percentageOfTotalMarksContent").style.display = "none";
    document.getElementById("mainn").style.display = "none";
}

function showMain(){
document.getElementById("mainn").style.display = "flex";
document.getElementById('logoId').textContent = 'School Tools'
}

function callBothFunctions() {
hideAllContent();
showMain();
}


// Focus on the input field when the page loads
window.addEventListener('load', () => {
    const inputField = document.getElementById('numberr');
    inputField.focus();
});

const inputFieldSum = document.getElementById('numberr');
const resultParagraph = document.getElementById('result');
const lengthParagraph = document.getElementById('length');

inputFieldSum.addEventListener('input', () => {
    // Get the value from the input field and split it into an array of numbers
    const inputText = inputFieldSum.value.trim(); // Remove leading/trailing whitespace
    const numbers = inputText === "" ? [] : inputText.split(' ').map(Number);

    // Calculate the sum of the numbers
    const sum = numbers.reduce((total, num) => total + num, 0);

    // Display the sum and the length of the array
    resultParagraph.textContent = `Total Marks: ${sum}`;
    lengthParagraph.textContent = `Total Entries: ${numbers.length}`;
});

const inputFieldSort = document.getElementById('numberInput');
const sortedList = document.getElementById('sortedList');

inputFieldSort.addEventListener('input', () => {
    // Get the value from the input field and split it into an array of numbers
    const inputText = inputFieldSort.value.trim(); // Remove leading/trailing whitespace
    const numbers = inputText === "" ? [] : inputText.split(' ').map(Number);

    // Sort the array in descending order
    const sortedArray = [...numbers].sort((a, b) => b - a);

    // Display the sorted array with positions for the first three numbers
    // and without positions for the rest
    sortedList.innerHTML = ""; // Clear previous content
    sortedArray.forEach((number, index) => {
        // const position = index < 3 ? ["1st", "2nd", "3rd"][index] : "";
        const listItem = document.createElement('p');
        listItem.style.marginBottom = '10px'
        listItem.textContent = `Position | Number`;
        listItem.textContent = `${index + 1}${"  ⬅  "} ${number}`;
        // ${position ? " - " + position : ""}
        if (index + 1 < 10) {
            listItem.textContent = `0${index + 1}${"  ⬅  "} ${number}`;
        }
        sortedList.appendChild(listItem);
    });
});

// Add event listener to clear 'numberr' input field on 'c' key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'c' || event.key === '*') {
        inputFieldSum.value = '';
        resultParagraph.textContent = 'Total Marks: 0';
        lengthParagraph.textContent = 'Total Entries: 0';
        event.preventDefault(); // Prevent the 'c' key from being typed into the input field
    }
});

let inputTimer; // Declare the inputTimer outside of the event handlers

function updateTotalLabel(totalNumberByUser) {
    const totalLabel = document.getElementById('totalLabel');
    totalLabel.innerText = `Total Marks: ${totalNumberByUser}`;
}

document.getElementById("inputNumber").addEventListener("input", function () {
    clearTimeout(inputTimer);
    const inputNumber = parseFloat(this.value);
    const totalNumberByUser = parseInt(document.getElementById('tNumber').value) || 240;

    if (isNaN(inputNumber)) {
        document.getElementById("resultt").textContent = "";
        return;
    }

    updateTotalLabel(totalNumberByUser);

    const result = (inputNumber / totalNumberByUser) * 100;
    document.getElementById("resultt").textContent = `${inputNumber} From ${totalNumberByUser} = ${result.toFixed(2)}%`;

    // Clear the input field after 2 seconds
    inputTimer = setTimeout(() => {
        document.getElementById("inputNumber").value = '';
    }, 2000);
});

// Listen for changes in the total number input
document.getElementById("tNumber").addEventListener("input", function () {
    clearTimeout(inputTimer); // Clear the timer if the total number changes
    const totalNumberByUser = parseInt(this.value) || 240;
    const inputNumber = parseFloat(document.getElementById('inputNumber').value);

    if (isNaN(inputNumber)) {
        document.getElementById("resultt").textContent = "";
        return;
    }

    updateTotalLabel(totalNumberByUser);

    const result = (inputNumber / totalNumberByUser) * 100;
    document.getElementById("resultt").textContent = `${inputNumber} / ${totalNumberByUser} = ${result.toFixed(2)}%`;
});

const numberInput = document.getElementById("input"); //old id -> numberInputSec
const numbersDisplay = document.getElementById("resultByTime");     //old id -> resultTime
const countDisplay = document.getElementById("historyLabel"); //old id -> lengthTime

let sum = 0;
let count = 0;
let enteredNumbers = [];
let updateInterval;
let remainingTime = 2000;

function updateTimerDisplay() {

    if (remainingTime <= 0) {
        clearInterval(updateInterval); // Stop the timer when time reaches 0
    }
}

function updateSumCountNumbersAndResetInput() {
    const inputValue = parseFloat(numberInput.value);
    if (!isNaN(inputValue)) {
        sum += inputValue;
        enteredNumbers.push(inputValue);
        count++;
        countDisplay.textContent = `Entries: ${count}`;
        numbersDisplay.textContent = `${sum}`;
        document.getElementById('history').textContent = `${enteredNumbers.join(' ')}` // old id -> numbersDisplay1

    }
    numberInput.value = ""; // Clear the input field
    clearInterval(updateInterval); // Clear the interval
    updateTimerDisplay(); // Update the timer display once more after completion
}

numberInput.addEventListener("input", () => {
    clearInterval(updateInterval); // Clear any previous intervals
    const inputValue = numberInput.value.trim();
    if (inputValue !== "") {
        remainingWidth = 100; // Reset the progress bar width
        updateTimerDisplay(); // Start the timer display
        updateInterval = setInterval(updateTimerDisplay, 10); // Update the timer every 10 milliseconds
        setTimeout(() => {
            updateSumCountNumbersAndResetInput();
        }, 2000);
    }
});
function closeMenu() {
const checkbox = document.getElementById("checkbox_toggle");
if (checkbox) {
checkbox.checked = false;
}
}
// Initial timer display
updateTimerDisplay();

const fontSlider = document.getElementById("fontSlider");
const element1 = document.getElementById("historyLabel");
const element2 = document.getElementById("resultByTime");
const element3 = document.getElementById("input");
const element4 = document.getElementById("history");
const element5 = document.getElementById("box");
var widthh = 3; 
fontSlider.addEventListener("input", () => {
    const fontSize = fontSlider.value + "px";
    const width = (widthh + fontSlider.value) + "px";
    element1.style.fontSize = fontSize;
    element2.style.fontSize = fontSize;
    element3.style.fontSize = fontSize;
    element4.style.fontSize = fontSize;
    element5.style.width = width;
});