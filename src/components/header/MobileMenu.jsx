import React, { Component } from 'react'

export default class MobileMenu extends Component {
  state = {
    mobileHeight: 8,
    margin: 100,
    opened: false
  }
  toggleMenu = () => {
    if(this.state.opened){
      this.setState({
        mobileHeight: 110,
        margin: 0,
        opened: false
      })
    } else {
      this.setState({
        mobileHeight: 8,
        margin: 100,
        opened: true
      })
    }
  }
  render() {
    return (
      <nav className={`mainNav d-inline-block text-right pr-3 d-md-none 
      ${this.props.scrollDirection==='DOWN'?'navHidden':'navVisible'}`} style={{height:`${this.state.mobileHeight}vh`}}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item mr-2 my-2" onClick={this.toggleMenu}>
            <i className="fa fa-bars" style={{fontSize: '40px', color: '#EDF7F6'}}></i>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto" style={{marginTop: `-${this.state.margin}vh`}}>
          <li className="nav-item mr-2 my-2">
            <span style={{fontSize: '40px', color: '#EDF7F6'}}>Home</span>
          </li>
          <li className="nav-item mr-2 my-2">
            <span style={{fontSize: '40px', color: '#EDF7F6'}}>User</span>
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