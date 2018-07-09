import React, { Component } from 'react';
import UserInfo from './components/menu/user-info';

export default class Menu extends Component {
  state = {};

  render() { 
    return ( 
      <nav className="ma8">
        <UserInfo></UserInfo>
      </nav>
    );
  }
}