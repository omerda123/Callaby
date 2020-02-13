import React, { Component } from 'react'
import Message from './Message';


export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            chatMessages: [],
        };

        this.roomName = 'chat1';
        this.chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${this.roomName}/`);
    }


    sendMessage = (e) => {
        const message = document.querySelector('#chat-message-input').value;
        this.chatSocket.send(JSON.stringify({
            'message': message,
            'author': "{{ user_name }}",
            'chat_id': "{{ room_name|escapejs }}"
        }));
    }






    componentDidMount() {
        this.chatSocket.onopen = (e) => {
            console.log(e);
        }

        this.chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const message = data['message'];
            this.state.chatMessages.push(message)
        };
    }
    componentWillUnmount() {
        this.chatSocket.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };
    }


    render() {
        return (
            <div>
                <div className="chat-box">
                    {this.state.chatMessages.map((message) => {
                        return(<Message content={message} author="sender" />)
                    })}

                </div>
                <div>
                    <form>
                        <input type="text" className="chat-input" id="chat-message-input" />
                        <button id="chat-message-submit" type="button" value="Send" onClick={this.sendMessage}> send</button>
                    </form>
                </div>
            </div>
        )
    }
}
