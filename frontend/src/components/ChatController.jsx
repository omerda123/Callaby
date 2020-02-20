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
            waitingMessages: {},
            chatInput: '',
            customers: {}
        };
    }

    toggleChat(e){
        const waitingMessages = {...this.state.waitingMessages}
        waitingMessages[e.target.id] = 0
        this.setState({activeChat: e.target.id , waitingMessages})
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
            const chats = {...this.state.chats}
            const waitingMessages = {...this.state.waitingMessages}
            const room_id = parseInt(data.body.room_id);
            const customers ={...this.state.customers}
            if (data.type === "connect"){
                waitingMessages[data.body.room_id] = 0
                chats[data.body.room_id] = []
                this.setState({chats , waitingMessages})
                if (Object.keys(chats).length === 1)
                    this.setState({activeChat: room_id})
            }
            if (data.type === "customer_message"){
                chats[room_id].push(data.body.message)
                waitingMessages[room_id] +=1;
                this.setState({chats , waitingMessages})
            }
            if (data.type === "disconnect"){
                delete chats[room_id]
                delete waitingMessages[room_id]
                delete customers[room_id]
                this.setState({chats:chats})
            }
            if (data.type === "customer_name"){
                customers[room_id] = data.body.name
                this.setState({customers})
            }
        }
        
    }
    componentWillUnmount() {
        this.chatSocket.close();
        this.chatSocket = null
        }

    sendProduct(product){
        console.log(product);
        const msg = {
            'type': 'send_product',
            'body': {
                'room_id': this.state.activeChat,
                'name': product.name,
                'price':product.price,
                'image': product.imageUrl
            }
        }
        this.chatSocket.send(JSON.stringify(msg));
    }
    

    render() {
        const { chats } = this.state;
        const {activeChat} = this.state;
        const {waitingMessages} = this.state;
        const { customers } = this.state;



        return (
            <>
                <Tabs 
                chats={Object.keys(chats)} 
                customers = {customers}
                toggleChat={(e)=> this.toggleChat(e)} 
                waitingMessages={waitingMessages} />
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
