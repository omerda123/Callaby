/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import AgentHome from './components/AgentHome';
import './App.css';
import products from './Data/products';
import AgentStatus from './components/AgentStatus';
import Details from './components/Details';
import Chat from './components/Chat';
import Carusel from './components/Carousel';
import ChatController from './components/ChatController';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
        };
        this.chatRef = React.createRef();
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        fetch('/whoami/')
            .then((user) => user.json())
            .then((user) => this.setState({ user }));
    }


    toggleLogin() {
        this.setState((state) => ({ loggedIn: !state.loggedIn }));
    }


    render() {
        return (

            <div className="container">

                <div className="agent-home">
                    <div className="left">
                        <AgentStatus user={this.state.user} />
                        <Details />
                    </div>
                    <div className="center">
                        <ChatController ref={this.chatRef} />
                    </div>
                    <div className="right">
                        <a href="/accounts/logout/">logout</a>
                        <Carusel products={products} onProductChange={(p) => this.chatRef.current.sendProduct(p)} onFormPress={(f) => this.chatRef.current.startForm(f)} />

                    </div>
                </div>
            </div>
        );
    }
}
