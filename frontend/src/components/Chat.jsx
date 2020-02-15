import React, { Component } from 'react'
import Message from './Message';


export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            chatMessages: [],
            roomName: 'room1',
            chat_input:''
        };
        this.roomName = 'chat1';
        this.chatSocket = new WebSocket(`${this.props.ws_url}${this.state.roomName}/`);
    }


    sendMessage = (e) => {
        this.chatSocket.send(JSON.stringify({
            'message': this.state.chat_input,
            'agent':'Omer Daniel',
            'customer': 'unknown_customer',
            'chat_id': "{{ room_name|escapejs }}"
        }));
    };

    handleKeyDown = (e) =>{
        console.log(e.target.value);  
        this.setState({chat_input:e.target.value })  
        if (e.key === 'Enter') {
            this.sendMessage(e);
            document.querySelector('#chat-message-input').value ='';
            this.setState({chat_input:''})
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
        this.chatSocket.send(JSON.stringify({
            'message': 'close',
            'agent':'Omer Daniel',
            'customer': 'unknown_customer',
            'chat_id': "{{ room_name|escapejs }}"
        }));
        this.chatSocket.close();
        this.chatSocket = null
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
                        <input type="text" className="chat-input" id="chat-message-input" onKeyUp={this.handleKeyDown}/>
                </div>
            </div>
        )
    }
}
