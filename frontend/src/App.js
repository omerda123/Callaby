import React, { Component } from 'react'
import Login from './components/Login'
import AgentHome from './components/AgentHome'
import './App.css'
import products from './Data/products'
import Admin from './components/admin/AdminHome'

export default class App extends Component {
  state = {
    loggedIn: false,
    products: products,
    role: 1,
    stam:1,
  }

  toggleLogin() {
    this.setState({ loggedIn: !this.state.loggedIn })
  }

  render() {
    return (
      <div className="container">
        {
          this.state.loggedIn ?
            this.state.role === 1 ?
              <AgentHome products={this.state.products}></AgentHome> :
              <Admin role={this.state.role}></Admin> :
            <Login toggleLogin={() => this.toggleLogin()}></Login>

        }
      </div>
    )
  }
}
