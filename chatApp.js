function appendHistory(text) {
    let historyContainer = document.getElementById('history');
    let myNewElement = document.createElement('div');
    myNewElement.classList.add('column');
    myNewElement.innerHTML = text;
    historyContainer.appendChild(myNewElement);
}

function sendUserInput() {
    const userInput = document.getElementById('userInput').value;
    console.log(userInput)
    //TODO fazer validação antes de enviar
    if(required(userInput)) {
        appendHistory(userInput);
        document.getElementById('userInput').value = '';
    }
}

function required(userInput) {
    console.log(userInput.value)
    if (userInput.value.length == 0) { 
        swal('message cannot be null') 	
        return false; 
    }  	
    return true; 
}