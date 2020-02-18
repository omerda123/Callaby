const sendMessage = (e) => {
    if (e.code === 'Enter') {
        message = chatInput.value;
        chatSocket.send(JSON.stringify({
            type: "message",
            body: message
        }));
        chatInput.value = '';
    }
}


const toggleChat = () => {
    if (chat.classList.contains('hidden'))
        chat.classList.remove('hidden')
    else
        chat.classList.add('hidden')
}


const chatSocket = new WebSocket(
    'ws://localhost:8000' +
    '/ws/chat/');

chatSocket.onopen = function (e) {
    console.log(e)
}

chatSocket.onmessage = function (e) {
    if (document.querySelector("#no-members"))
        document.querySelector("#no-members").remove();
    let data = JSON.parse(e.data);
    console.log(data)
    if (data['type'] === 'message') {

        let message = data['body']['message'];
        let chatBubble = document.createElement("div")
        chatBubble.innerHTML = message
        chatBox.appendChild(chatBubble)
    }
    else{
        console.log(`wrong message from web socket: ${data}`)
    }

};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};


const callaby = document.querySelector('#callaby');

const button = document.createElement('div')
button.addEventListener('click', toggleChat)
button.innerHTML = "Consult us"

const chat = document.createElement('div')
chat.classList.add('chat', 'hidden');
chat.innerHTML = "blabla"

callaby.append(chat)
callaby.appendChild(button)

const chatBox = document.createElement('div')
chat.appendChild(chatBox)

const chatInput = document.createElement('input')
chatInput.addEventListener('keydown', sendMessage)
chat.appendChild(chatInput)
