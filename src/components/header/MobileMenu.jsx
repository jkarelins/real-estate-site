import React, { Component } from 'react'

export default class MobileMenu extends Component {
  render() {
    return (
      <nav className={`mainNav d-inline-block text-right pr-3 d-md-none ${this.props.scrollDirection==='DOWN'?'navHidden':'navVisible'}`}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item mr-2 my-2">
            <i className="fa fa-bars" style={{fontSize: '40px', color: '#EDF7F6'}}></i>
          </li>
        </ul>
      </nav>
    )
  }
}

// Add onClick to open mobile menu
// Add modal to footer
// Show menu in modal
// 