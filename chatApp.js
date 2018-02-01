function appendHistory(text) {
    let historyContainer = document.getElementById('history');
    let myNewElement = document.createElement('div');
    myNewElement.classList.add('column');
    myNewElement.innerHTML = text;
    historyContainer.appendChild(myNewElement);
}

function sendUserInput() => {
    const userInput = document.getElementById('userInput').value;
    //TODO fazer validação antes de enviar

    let userInputToSend = {
        text: userInput
    };
    let success = () => {
        appendHistory(userInput);
    };
    let error = () => {} ;

    makeRequest(userInputToSend, success, error);

}

function makeRequest(obj, success, error) => {

    let request = new XMLHttpRequest();

    request.open('POST', '/my/url', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            success();
        } else {
            error();
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        error();
    };

    request.send(JSON.stringify(obj));

}