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
    };

    handleKeyDown = (e) =>{
        if (e.key === 'Enter') {
            this.sendMessage(e);
            document.querySelector('#chat-message-input').value ='';
          }
    }

    componentDidMount() {
        this.chatSocket.onopen = (e) => {
            console.log(e);
        }

        this.chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const message = data['message'];
            console.log(message)
            let arrMSG = [...this.state.chatMessages]
            arrMSG.push(message)
            this.setState({chatMessages: arrMSG})
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
                        <input type="text" className="chat-input" id="chat-message-input" onKeyDown={this.handleKeyDown}/>
                </div>
            </div>
        )
    }
}
