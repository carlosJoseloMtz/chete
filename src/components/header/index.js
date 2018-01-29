import React, { Component } from 'react'
import './index.css'

class Header extends Component {

  render () {
    return (
      <div className="header">
        <div className="auto-complete">
          <input />
        </div>
        <div className="links">
          <nav>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Category 1</a>
              </li>
              <li>
                <a href="#">Category 2</a>
              </li>
              <li>
                <a href="#">Category 3</a>
              </li>
            </ul>
          </nav>
          <div className="cart">
            <a href="#">Cart</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
