import React from 'react'

export default function AgentStatus() {
    return (
        <div className="agent-area">
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9MVF1euuahaAdL4r6Y4P4PaVdewuQlhn1MoPjL8bMEyJxI_Aq" className="agent-avatar" alt="agent-avatar"></img>
            </div>
            <div className="agent-details">
                <div className="agent-name">
                    Omer Daniel
                    </div>
                <div>
                    <div className="status-bubble"></div>
                    Available
                    </div>
            </div>
        </div>
    )
}
