import React, { useRef, useEffect } from 'react';
import Message from './Message';
import message from './Message';
import Form from './Form';


export default function Chat(props) {
    const { messages } = props;
    const { handleChange } = props;
    const { handleKeyUp } = props;
    const { chatInput } = props;
    const { active } = props;
    const { formInputHandle } = props;
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        console.log('message');
        scrollToBottom();
    }, [messages ? messages.length : null]);

    return (
        <div>
            {

                active === 'chat'
                    ? (
                        <div className="chat-box">
                            {
                                messages
                                    ? messages.map((message, i) => (<Message key={i} content={message.text} author={message.sender} />))
                                    : <div> You are here alone :( </div>
                            }

                            <div className="dummy" ref={messagesEndRef} />
                        </div>
                    )

                    : <Form formInputHandle={formInputHandle} />
            }


            <div>
                <input type="text" autoComplete="off" className="chat-input" id="chat-message-input" value={chatInput} onChange={(e) => handleChange(e)} onKeyUp={(e) => handleKeyUp(e)} disabled />
            </div>
        </div>
    );
}
