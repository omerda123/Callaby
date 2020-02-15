import React from 'react'

export default function message(props) {
    return (
        <div className={`chat-bubble ${props.author}`}>{props.content}</div>
    )
}
