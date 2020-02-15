/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import Login from './components/Login';
import AgentHome from './components/AgentHome';
import './App.css';
import products from './Data/products.json';
import Admin from './components/admin/AdminHome';


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            role: 1,
            user: null,
        };

        this.wsUrl = 'ws://127.0.0.1:8000/ws/chat/';
    }


    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        fetch('/api/users/')
            .then((user) => user.json())
            .then((user) => this.setState({ user }));
    }


    toggleLogin() {
        this.setState((state) => ({ loggedIn: !state.loggedIn }));
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.role === 1
                        ? (
                            <AgentHome
                                products={products}
                                user={this.state.user}
                                ws_url={this.wsUrl}
                            />
                        )

                        : <Admin role={this.state.role} />

                }
                {
                    this.state.role === 4
                        ? <Login toggleLogin={() => this.toggleLogin()} />
                        : null
                }
            </div>
        );
    }
}
