import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchPage from './pages/search'
import Header from '../components/header'
import './index.css'

class StorefrontApp extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return <div>
      <Header />
      <div className="page">
        <Route
        path="/storefront/search"
        component={SearchPage} />
      </div>
    </div>
  }
}

export default StorefrontApp
