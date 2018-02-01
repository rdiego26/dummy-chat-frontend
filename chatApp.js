function appendHistory(text) {
    let historyContainer = document.getElementById('history');
    let myNewElement = document.createElement('div');
    myNewElement.classList.add('column');
    let myNewTextNode = document.createTextNode(text);
    historyContainer.appendChild(myNewElement);
}