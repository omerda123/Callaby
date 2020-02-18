import React from 'react';
import Message from './Message';

export default function Chat(props) {
    const { messages } = props;
    const { handleChange } = props;
    const { handleKeyUp } = props;
    const { chatInput } = props;

    let mesRef = React.createRef();

    const scrollToBottom = () => {
        mesRef.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className="chat-box">
                {messages.map((message, i) => (<Message key={i} content={message} author="sender" />))}

                <div className="dummy" ref={(el) => { mesRef = el; }} />
            </div>
            <div>
                <input type="text" autoComplete="off" className="chat-input" id="chat-message-input" value={chatInput} onChange={(e) => handleChange(e)} onKeyUp={(e) => handleKeyUp(e)} />
            </div>
        </div>
    );
}


// import React, { Component } from 'react'
// import Message from './Message';


// export default class Chat extends Component {
//     constructor(props) {
//         super(props);
//         this.props = props;
//         this.mesRef = React.createRef();
//     }

//     componentDidUpdate(){
//         this.scrollToBottom()

//     }

//     scrollToBottom = () => {
//         this.messageEnd.scrollIntoView({ behavior: 'smooth' })
//       }


//     sendMessage = () => {
//         const msg = {
//             'type': 'message',
//             'body': {
//                 'message': this.state.chatInput,
//                 'room_id': 0
//             }
//         }
//         this.setState((state)=>{

//             return {
//                 chatMessages: [...state.chatMessages, msg],
//                 chatInput: ''
//             }
//         } ,() => this.scrollToBottom()
//         )
//         this.chatSocket.send(JSON.stringify(msg));

//     };

//     handleKeyUp = (e) =>{
//         if (e.key === 'Enter') {
//             this.sendMessage();
//         }
//     }

//     handleChange = (e) =>{
//         this.setState({chatInput:e.target.value })
//     }


//     componentDidMount() {
//         fetch('/api/messages/')
//         .then((chatMessages) => chatMessages.json())
//         .then(chatMessages => chatMessages = chatMessages['results'])
//         .then((chatMessages) => this.setState({ chatMessages }));
//         this.scrollToBottom()

//         this.chatSocket.onopen = (e) => {
//             console.log(e);
//         }


//         this.chatSocket.onmessage = (e) => {
//             const data = JSON.parse(e.data);
//             console.log(data);

//             this.setState((state)=>{

//                 return {
//                     chatMessages: [...state.chatMessages, data],
//                 }
//             })

//             // console.log(message)
//             // let arrMSG = [...this.state.chatMessages]
//             // arrMSG.push(message)
//             // this.setState({chatMessages: arrMSG})
//         };


//     }
//     componentWillUnmount() {
//         this.chatSocket.close();
//         this.chatSocket = null

//         this.chatSocket.send(JSON.stringify({
//             'message': 'close',
//             'agent':'Omer Daniel',
//             'customer': 'unknown_customer',
//             'chat_id': "{{ room_name|escapejs }}"
//         }));

//     }


//     render() {
//         return (
//             <div>
//                 <div className="chat-box" >
//                     {this.state.chatMessages.map((message,i) => {
//                         return(<Message key={i} content={message.message} author="sender" />)
//                     })}

//                 <div className="dummy" ref={(el) => {this.messageEnd= el;}}></div>
//                 </div>
//                 <div>
//                         <input type="text" autoComplete="off" className="chat-input" value={this.state.chatInput} id="chat-message-input" onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
//                 </div>
//             </div>
//         )
//     }
// }
