var roomName = "{{ room_name|escapejs }}";
let numOfParticipants = 0
var chatSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/chat/' + roomName + '/');
document.querySelector(".number").innerHTML = `there are ${numOfParticipants} participants in the chat`


chatSocket.onopen = function (e) {
    console.log(e)
}

chatSocket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    chatList = document.querySelector("#chat-list")
    li = document.createElement("li")
    li.innerHTML = message
    chatList.appendChild(li)
};

chatSocket.onclose = function (e) {
    numOfParticipants -= 1
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function (e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function (e) {
    var messageInputDom = document.querySelector('#chat-message-input');
    var message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message
    }));

    messageInputDom.value = '';
};
