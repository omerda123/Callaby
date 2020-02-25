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
                {
                    messages
                        ? messages.map((message, i) => (<Message key={i} content={message} author="sender" />))
                        : <div> You are here alone :( </div>
                }
                {}

                <div className="dummy" ref={(el) => { mesRef = el; }} />
            </div>
            <div>
                <input type="text" autoComplete="off" className="chat-input" id="chat-message-input" value={chatInput} onChange={(e) => handleChange(e)} onKeyUp={(e) => handleKeyUp(e)} disabled />
            </div>
        </div>
    );
}

