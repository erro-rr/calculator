// empty string
let string = "";
let buttons = document.querySelectorAll('.button');
let history = [];
let historyIndex = 0;

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        try {
            if (e.target.innerHTML == '=') {
                // If the clicked button is '=', evaluate the mathematical expression
                let result = eval(string);
                history.unshift({ expression: string, result });
                history = history.slice(0, 10);
                document.querySelector('.input').value = result;
            } else if (e.target.innerHTML == 'c') {
                // If the clicked button is 'c', reset the string to an empty value
                string = "";
                document.querySelector('.input').value = string;
            } else if (e.target.id === 'history-button') {
                showHistory();
            } else {
                // For other buttons, concatenate their innerHTML to the string
                string = string + e.target.innerHTML;
                document.querySelector('.input').value = string;
            }
        } catch (error) {
            // If an error occurs during evaluation, log the error to the console
            console.error('An error occurred:', error.message);
        }
    });
});

function showHistory() {
    let inputField = document.querySelector('.input');

    if (history.length > 0) {
        if (historyIndex < history.length) {
            // Display one history entry at a time
            let entry = history[historyIndex];
            inputField.value = `${entry.expression} = ${entry.result}`;
            historyIndex++;
        } else {
            // Reset the index when all entries are shown
            historyIndex = 0;
            inputField.value = '';
        }
    } else {
        // No history entries
        inputField.value = 'No history available.';
    }
}
