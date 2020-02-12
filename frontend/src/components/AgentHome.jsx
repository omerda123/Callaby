import React from 'react'
import AgentStatus from './AgentStatus'
import Details from './Details'
import Chat from './Chat'
import Carusel from './Carousel'

export default function AgentHome(props) {
    return (
        <div className="agent-home">
            <div className="left">
                <AgentStatus></AgentStatus>
                <Details></Details>
                
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
