import React from 'react';

export default function Tabs(props) {
    const { chats } = props;
    const { toggleChat } = props;
    return (
        <div className="tabs">
            {
                chats.map((chat, i) => (
                    <div className="tab" key={i} onClick={(e) => toggleChat(e)}>
                        {chat}
                    </div>
                ))
            }
        </div>
    );
}
