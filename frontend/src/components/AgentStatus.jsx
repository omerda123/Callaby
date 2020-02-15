import React from 'react';

export default function AgentStatus(props) {
    return (
        <div className="agent-area">
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9MVF1euuahaAdL4r6Y4P4PaVdewuQlhn1MoPjL8bMEyJxI_Aq" className="agent-avatar" alt="agent-avatar" />
            </div>
            <div className="agent-details">
                <div className="agent-name">
                    {
                        props.user
                            ? (
                                <>
                                    {props.user.results[0].first_name}
                                    {' '}
                                    {props.user.results[0].last_name}
                                    {' '}
                                </>
                            )
                            : null

                    }
                </div>

                <div>
                    <div className="status-bubble" />
                    Available
                </div>
            </div>
        </div>
    );
}
