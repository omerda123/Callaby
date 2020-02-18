/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import Login from './components/Login';
import AgentHome from './components/AgentHome';
import './App.css';
import products from './Data/products.json';


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            role: 2,
        };

        this.wsUrl = 'ws://localhost:8000/ws/chat/';
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
                <AgentHome products={products} user={this.state.user} ws_url={this.wsUrl} />
            </div>
        );
    }
}
