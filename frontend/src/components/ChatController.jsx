import React, { Component } from 'react';
import Chat from './Chat';
import Tabs from './Tabs';

const wsUrl = 'ws://localhost:8000/ws/chat/';


export default class ChatController extends Component {
    constructor(props) {
        super(props);
        this.chatSocket = new WebSocket(`${wsUrl}`);

        this.state = {
            chats: {},
            activeChat: '200',
            chatInput: '',
        };
    }

    toggleChat(e){
        this.setState({activeChat: e.target.innerHTML})
    }

    handleChange(e) {
        this.setState({ chatInput: e.target.value });
    }

    sendMessage ()  {
        const msg = {
                    'type': 'message',
                    'body': {
                        'message': this.state.chatInput,
                        'room_id': this.state.activeChat
                    }
     }
     this.chatSocket.send(JSON.stringify(msg));
    }
    

    handleKeyUp = (e) =>{
        if (e.key === 'Enter') {
            console.log(this.state.chats[this.state.activeChat]);
            this.state.chats[this.state.activeChat].push(this.state.chatInput);
            this.sendMessage ()
            this.setState({chatInput:''})
        }

    }
    componentDidMount() {
        this.chatSocket.onopen = (e) => {
            console.log(e);
        }

        this.chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(`data: ${data}`);
            if (data.type === "connect"){
                const chats = {...this.state.chats}
                chats[data.body.room_id] = []
                this.setState({chats:chats})
            }
            if (data.type === "message"){
                const chats = {...this.state.chats}
                chats[data.body.room_id].push(data.body.message)
                this.setState({chats:chats})
            }
        }
        
    }
    componentWillUnmount() {
        this.chatSocket.close();
        this.chatSocket = null
        }
    

    render() {
        const { chats } = this.state;
        const {activeChat} = this.state;


        return (
            <>
                <Tabs chats={Object.keys(chats)} toggleChat={(e)=> this.toggleChat(e)} />
                <Chat 
                    messages={chats[activeChat]} 
                    handleChange={(e) => this.handleChange(e)} 
                    handleKeyUp={this.handleKeyUp} 
                    chatInput = {this.state.chatInput}
                />
            </>
        );
    }
}
