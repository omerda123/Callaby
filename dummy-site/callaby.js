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
const sendName = (e) =>{
    const message = nameInput.value;
    window.chatSocket.send(JSON.stringify({
        type: 'customer_name',
        body: {
            'name': message,
        }
    }));
    nameDiv.classList.add('hidden')
    chatDiv.classList.remove('hidden')
    
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
        if (data['type'] == 'send_product'){
            let message = `I recommend you to buy ${data['body']['name']}!! \n it cost ${data['body']['price']}$`;
            let chatBubble = document.createElement("div")
            let image = document.createElement('img')
            image.style.width = '60px';
            image.style.height = '60px';
            image.src = data['body']['image'];
            chatBubble.innerHTML = message
            chatBox.appendChild(chatBubble)
            chatBox.appendChild(image)
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

callaby.append(chat)
callaby.appendChild(button)


const chatBox = document.createElement('div')
chat.appendChild(chatBox)
chatBox.className = "chat-text"

const chatInput = document.createElement('input')
chatInput.addEventListener('keydown', sendMessage)
chat.appendChild(chatInput)

const chatDiv = document.createElement('div')
chatDiv.appendChild(chatBox)
chatDiv.appendChild(chatInput)
chat.appendChild(chatDiv)
chatDiv.classList.add('hidden')


/*  <---------------- name form ---------------->  */

const nameInput = document.createElement('input')
const submitName = document.createElement('button')
submitName.addEventListener('click', sendName);
submitName.innerHTML = "submit"
const nameLabel = document.createElement('p')
nameLabel.innerHTML = "Please enter your name"
const nameDiv = document.createElement('div')
nameDiv.className = "name-form"
chat.appendChild(nameDiv)
nameDiv.appendChild(nameLabel)
nameDiv.appendChild(nameInput)
nameDiv.appendChild(submitName)