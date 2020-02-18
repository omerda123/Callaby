import React from 'react';
import AgentStatus from './AgentStatus';
import Details from './Details';
import Chat from './Chat';
import Carusel from './Carousel';
import ChatController from './ChatController';


export default function AgentHome(props) {
    return (
        <div className="agent-home">
            <div className="left">
                <AgentStatus user={props.user} />
                <Details />
            </div>
            <div className="center">
                <ChatController />
            </div>
            <div className="right">
                <a href="/accounts/logout/">logout</a>
                <Carusel products={props.products} />

            </div>
        </div>
    );
}
