/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './App.css';
import products from './Data/products';
import AgentStatus from './components/AgentStatus';
import Details from './components/Details';
import Carusel from './components/Carousel';
import ChatController from './components/ChatController';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            customers: {},
            activeChat : '',
        };
        this.chatRef = React.createRef();
    }


    tick() {
        const customers = { ...this.state.customers}
        let time = new Date( Date.now() - Date.parse(customers[this.state.activeChat]['startTime']))
        let format_time  = time.getMinutes()+":"+time.getSeconds();
        customers[this.state.activeChat]['timer'] = format_time
        this.setState({customers});
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

    setActiveChat = (room_id) =>{
        this.setState({activeChat: room_id})
    }

    setCustomer = (action, room_id, customer_name = null) =>{
        const customers = { ...this.state.customers };
        if (action === 'delete') {
            delete customers[room_id];
        }
        if (action === 'add') {
            customers[room_id] = {
                name:customer_name,
                startTime: new Date()
            };
            this.timerID = setInterval(
                () => this.tick(),
                1000
              );
        }
        this.setState({ customers });
    }

    render() {
        return (

            <div className="container">

                <div className="agent-home">
                    <div className="left">
                        <AgentStatus user={this.state.user} />
                        <Details 
                        customers={this.state.customers}
                        activeChat = {this.state.activeChat} />
                    </div>
                    <div className="center">
                        <ChatController 
                        ref={this.chatRef} 
                        customers={this.state.customers} 
                        setCustomer={this.setCustomer} 
                        setActiveChat = {this.setActiveChat}
                        activeChat = {this.state.activeChat}
                        />
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
