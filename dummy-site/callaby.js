const sendMessage = (e) => {
    if (e.code === 'Enter') {
        let message = chatInput.value;
        window.chatSocket.send(JSON.stringify({
            type: 'customer_message',
            body: {
                'message': message,
            }
        }));
        let chatBubble = document.createElement("div")
        chatBubble.innerHTML = message
        chatBox.appendChild(chatBubble)
        chatInput.value = '';
    }
}

const initSocket = ()=>{
    window.chatSocket = new WebSocket('ws://localhost:8000/ws/chat/')
    window.chatSocket.onmessage = handleMessage;
    window.chatSocket.onclose = handleClose;
    chatSocket.onopen = function (e) {
        console.log(e)
    }
    
}

const handleClose = (e) =>{
    console.error('Chat socket closed unexpectedly');
}

const handleMessage = (e)=>{
    let data = JSON.parse(e.data);
        console.log(data)
        if (data['type'] === 'message') {
            let message = data['body']['message'];
            let chatBubble = document.createElement("div")
            chatBubble.innerHTML = message
            chatBox.appendChild(chatBubble)
        } else {
            console.log(`wrong message from web socket: ${data}`)
        }
}

const toggleChat = () => {
    initSocket()
    if (chat.classList.contains('hidden'))
        chat.classList.remove('hidden')
    else
        chat.classList.add('hidden')
}



/*  <---------------- DOM ---------------->  */


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
