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
        chatBubble.classList.add('chat-bubble')
        chatBubble.innerHTML = message
        chatBox.appendChild(chatBubble)
        chatDiv.scrollTop = chatDiv.scrollHeight;
        chatInput.value = '';
    }
}
const sendName = (e) => {
    const message = nameInput.value;
    window.chatSocket.send(JSON.stringify({
        type: 'customer_name',
        body: {
            'name': message,
            'skill': 'Coffee machine'
        }
    }));
    nameDiv.classList.add('hidden')
    chatDiv.classList.remove('hidden')
    footer.innerHTML = '';
    footer.appendChild(chatInput)

}
const initSocket = () => {
    if (!window.chatSocket) {
        window.chatSocket = new WebSocket('ws://localhost:8000/ws/chat/')
        window.chatSocket.onmessage = handleMessage;
        window.chatSocket.onclose = handleClose;
        chatSocket.onopen = function (e) {
            console.log(e)
        }
    }

}

const submitForm = (e) => {
    const formdata = new FormData();
    const res = {}
    formdata.append("agent", 2);
    const allInputs = document.querySelectorAll(".form input")
    for (const input of allInputs) {
        console.log(input)
        res[input.id] = input.value
    }
    console.log(res)

    formdata.append("order_details", JSON.stringify(res));
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:8000/api/order/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    chatDiv.classList.add('hidden')
    const thanksDiv = document.createElement('div')
    thanksDiv.innerHTML = "Thank you for purchasing nespresso machine"
    chatDiv.classList.remove('hidden')
    document.querySelector('.form').classList.add('hidden')
    chatDiv.appendChild(thanksDiv);
    window.chatSocket.send(JSON.stringify({
        type: 'finish',
        body: {}
    }));
    window.chatSocket.close();
}

const handleClose = (e) => {
    window.chatSocket = null;
    console.error('Chat socket closed unexpectedly');
}

let timeout = null

const sendFormToWS = (msg) =>{
    console.log(msg)
    window.chatSocket.send(JSON.stringify({
            type: 'customer_form_data',
            body: {
                'form': JSON.stringify(msg),
            }
        }));
}
    const temp = {}

const sendFormData = (e) => {
    clearTimeout(timeout)
    temp[e.target.id] = e.target.value;
    console.log(temp)
    timeout = setTimeout(() => sendFormToWS(temp), 500);

}

const handleMessage = (e) => {
    let data = JSON.parse(e.data);
    console.log(data)
    if (data['type'] === 'message') {
        let message = data['body']['message'];
        let chatBubble = document.createElement("div")
        chatBubble.classList.add('chat-bubble')
        chatBubble.classList.add('agent')
        chatBubble.innerHTML = message
        chatBox.appendChild(chatBubble)
        chatDiv.scrollTop = chatDiv.scrollHeight;

    } else if (data['type'] == 'send_product') {
        let message = `I recommend you to buy ${data['body']['name']}!! \n it cost ${data['body']['price']}$`;
        let chatBubble = document.createElement("div")
        let image = document.createElement('img')
        image.style.width = '60px';
        image.style.height = '60px';
        image.src = data['body']['image'];
        chatBubble.innerHTML = message
        chatBox.appendChild(chatBubble)
        chatBox.appendChild(image)
    } else if (data['type'] == 'start_form') {
        chatBox.classList.add('hidden')
        chatInput.classList.add('hidden')
        const formDiv = document.createElement('div');
        formDiv.className = "form"
        const json_data = JSON.parse(data['body']['form-fields'])
        json_data.map(item => {
            const input = document.createElement('input');
            input.type = item.type;
            input.id = item.label;
            input.addEventListener('keyup', sendFormData)
            input.placeholder = item.label;
            formDiv.appendChild(input)
        })
        const submit = document.createElement('button')
        submit.innerHTML = "Submit"
        submit.onclick = submitForm
        formDiv.appendChild(submit)
        chatDiv.appendChild(formDiv)
    } else if (data['type'] == 'form_data') {
        const json_data = data['body']['form-data']
        Object.keys(json_data).map(key => {
            console.log(key)
            const input = document.getElementById(`${key}`);
            console.log(input);
            input.value = json_data[key]
        })
    } else {
        console.log(`wrong message from web socket: ${data}`)
    }
}

const toggleChat = (e) => {
    initSocket()
    if (chat.classList.contains('hidden'))
        chat.classList.remove('hidden')
    else
        chat.classList.add('hidden')
}


/*  <---------------- DOM ---------------->  */


const callaby = document.querySelector('#callaby');

const button = document.createElement('div')
button.classList.add('callaby-button')

button.addEventListener('click', toggleChat)

const chat = document.createElement('div')
chat.classList.add('chat', 'hidden');
button.innerHTML = "Consult \n us"
callaby.append(chat)
callaby.appendChild(button)

const header = document.createElement('div')
header.classList.add('callaby-header')
header.innerHTML = "Callaby"
chat.appendChild(header)


const chatBox = document.createElement('div')
chat.appendChild(chatBox)
chatBox.className = "chat-text"

const chatInput = document.createElement('input')
chatInput.addEventListener('keydown', sendMessage)

const chatDiv = document.createElement('div')
chatDiv.classList.add('chat-div')
chatDiv.appendChild(chatBox)
chatDiv.appendChild(chatInput)
chat.appendChild(chatDiv)
chatDiv.classList.add('hidden')


/*  <---------------- name form ---------------->  */

const nameInput = document.createElement('input')
const submitName = document.createElement('button')
submitName.addEventListener('click', sendName);
submitName.innerHTML = "submit"
const nameLabel = document.createElement('div')
nameLabel.innerHTML = "Please enter your name"
const nameDiv = document.createElement('div')
nameDiv.className = "name-form"
chat.appendChild(nameDiv)
nameDiv.appendChild(nameLabel)
nameDiv.appendChild(nameInput)
nameDiv.appendChild(submitName)

const footer = document.createElement('div')
footer.classList.add('callaby-footer')
footer.innerHTML = "Powered by Callaby®"
chat.appendChild(footer)
