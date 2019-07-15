import React from 'react';
import logo from 'assets/icons/logo.svg';
import './header.styles.css';

class Header extends React.Component {
  render() {
    return (
      <header className="App-header">
        <a href="/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
      </header>
    );
  }
}

export default Header;
