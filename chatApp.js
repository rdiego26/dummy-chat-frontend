function appendHistory(text) {
    let historyContainer = document.getElementById('history');
    let myNewElement = document.createElement('div');
    myNewElement.classList.add('column');
    myNewElement.innerHTML = text;
    historyContainer.appendChild(myNewElement);
}

function sendUserInput() {
    const userInput = document.getElementById('userInput').value;
    //TODO fazer validação antes de enviar
    appendHistory(userInput);
}