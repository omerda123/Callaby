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
            products,
            role: 1,
        };
    }

    toggleLogin() {
        this.setState((state) => ({ loggedIn: !state.loggedIn }));
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.role === 1
                        ? <AgentHome products={this.state.products} />
                        : <Admin role={this.state.role} />
                    //  <Login toggleLogin={() => this.toggleLogin()}></Login>
                }
            </div>
        );
    }
}
