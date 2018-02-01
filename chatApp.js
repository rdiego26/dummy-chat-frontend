let appendHistory = (text) => {
    let historyContainer = document.getElementById('history');
    let myNewElement = document.createElement('div');
    myNewElement.classList.add('column');
    myNewElement.innerHTML = text;
    historyContainer.appendChild(myNewElement);
};

let sendUserInput = () => {
    const userInput = document.getElementById('userInput').value;

    if(userInput == '' || !userInput) {
        swal({
            title: 'Error!',
            text: 'Por favor, informe a mensagem!',
            type: 'error'
        });
    } else {
        let userInputToSend = { question: userInput };
        let success = (response) => {
            let resp = response.answer || 'N/A';
            appendHistory(userInput);
            appendHistory(resp);
        };
        let error = () => {
            swal({
                title: 'Error!',
                text: 'Ocorreu um erro durante a comunicação com servidor! :(',
                type: 'error'
            });
        } ;

        makeRequest(userInputToSend, success, error);
        appendHistory(userInput);
        document.getElementById('userInput').value = '';
    }
};

let makeRequest = (obj, success, error) => {

    let request = new XMLHttpRequest();

    request.open('POST', 'http://051cb39d.ngrok.io/bot', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            success(JSON.parse(request.responseText));
        } else {
            error();
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        error();
    };

    request.send(JSON.stringify(obj));

};

let handleUserFeedback = (title, type, message, cb) => {
    swal({
        title: title,
        text: message,
        type: type
    }, cb);
};