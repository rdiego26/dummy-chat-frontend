let appendChatHistory = (text) => {
    let historyContainer = document.getElementById('history');

    let fatherElement = document.createElement('div');
    fatherElement.classList.add('row');

    let childrenElement = document.createElement('div');
    childrenElement.classList.add('column');
    childrenElement.classList.add('column-50');

    let prefixElement = document.createElement('strong');
    prefixElement.innerHTML = 'Bot: ';
    let textBotElement = document.createElement('span');
    textBotElement.innerHTML = text;

    childrenElement.appendChild(prefixElement);
    childrenElement.appendChild(textBotElement);

    fatherElement.appendChild(childrenElement);
    historyContainer.appendChild(fatherElement);
};

let appendUserHistory = (text) => {
    let historyContainer = document.getElementById('history');

    let fatherElement = document.createElement('div');
    fatherElement.classList.add('row');

    let childrenElement = document.createElement('div');
    childrenElement.classList.add('column');
    childrenElement.classList.add('column-50');

    let prefixElement = document.createElement('strong');
    prefixElement.innerHTML = 'Você: ';
    let textBotElement = document.createElement('span');
    textBotElement.innerHTML = text;

    childrenElement.appendChild(prefixElement);
    childrenElement.appendChild(textBotElement);

    fatherElement.appendChild(childrenElement);
    historyContainer.appendChild(fatherElement);
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
        appendUserHistory(userInput);

        let success = (response) => {
            let resp = response.answer || 'Desculpe, não consegui entender =/';
            appendChatHistory(resp);
        };
        let error = () => {
            swal({
                title: 'Error!',
                text: 'Ocorreu um erro durante a comunicação com servidor! :(',
                type: 'error'
            });
        } ;

        makeRequest(userInputToSend, success, error);
        document.getElementById('userInput').value = '';
    }
};

let makeRequest = (obj, success, error) => {

    let request = new XMLHttpRequest();

    request.open('POST', 'http://chatbot.staging.99taxis.com/bot', true);

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

let initialize = () => {
    animatelo.fadeInUp(document.getElementById('greeting'));
    animatelo.lightSpeedIn(document.getElementById('actionButton'));
};

let onInputSubmit = (event) => {
    if (event.which == 13 || event.keyCode == 13) {
        sendUserInput();
        return false;
    }
    return true;
}

initialize();