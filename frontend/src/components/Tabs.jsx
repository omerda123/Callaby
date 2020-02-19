import React from 'react';

export default function Tabs(props) {
    const { chats } = props;
    const { toggleChat } = props;
    const { waitingMessages } = props;

    return (
        <div className="tabs">
            {
                chats.map((chat, i) => (
                    <div className="tab" id={chat} onClick={(e) => toggleChat(e)}>
                        {chat}
                        {
                            waitingMessages[chat] === 0
                                ? null
                                : (
                                    <div className="tab-badge">
                                        {waitingMessages[chat]}
                                    </div>
                                )
                        }
                    </div>
                ))
            }
        </div>
    );
}
