import React, { useRef } from 'react';
import Message from './Message';

export default function Chat(props) {
    const { messages } = props;
    const { handleChange } = props;
    const { handleKeyUp } = props;
    const { chatInput } = props;
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        console.log(messagesEndRef);
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    };

    scrollToBottom();
    return (
        <div>
            <div className="chat-box">
                {
                    messages
                        ? messages.map((message, i) => (<Message key={i} content={message} author="sender" />))
                        : <div> You are here alone :( </div>
                }
                {/* {scrollToBottom()} */}

                <div className="dummy" ref={messagesEndRef} />
            </div>
            <div>
                <input type="text" autoComplete="off" className="chat-input" id="chat-message-input" value={chatInput} onChange={(e) => handleChange(e)} onKeyUp={(e) => handleKeyUp(e)} disabled />
            </div>
        </div>
    );
}
