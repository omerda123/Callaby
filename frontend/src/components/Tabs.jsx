import React from 'react';

export default function Tabs(props) {
    const { chats } = props;
    const { toggleChat } = props;
    const { waitingMessages } = props;
    const { customers } = props;

    return (
        <div className="tabs">
            {
                chats.map((chat, i) => (
                    <div className="tab" key={i} id={chat} onClick={(e) => toggleChat(e)}>
                        {customers[chat] !== undefined ? customers[chat].name : null}
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
