import React from 'react'
import AgentStatus from './AgentStatus'
import Details from './Details'
import Chat from './Chat'
import Carusel from './Carousel'

export default function AgentHome(props) {

    function foo (){
        return fetch('/api/users/')
    }
    return (
        <div className="agent-home">
            <div className="left">
                <AgentStatus></AgentStatus>
                <Details></Details>
                <button onClick={foo}> foo</button>
            </div>
            <div className="center">
                <Chat></Chat>
            </div>
            <div className="right">
            <Carusel products={props.products}/>
     
            </div>
        </div>
    )
}
