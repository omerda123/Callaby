import React from 'react'

export default function room({room , agent, customer}) {
    return (
        <div className="room">
            <div> Room: {room}</div>
            <div> Agent: {agent}</div>
            <div> Customer: {customer} </div>
        </div>
    )
}
