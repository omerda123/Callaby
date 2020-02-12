import React from 'react'

export default function Chat() {
    return (
        <div>
            <div className="chat-box">
                <div className="chat-bubble">Hi, what's up?</div>
            </div>
            <div>
                <form>
                    <input type="text" className="chat-input"></input>
                </form>
            </div>
        </div>
    )
}
