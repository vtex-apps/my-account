import React, { Component } from 'react'
import AppRouter from './components/AppRouter'
import ClientSide from './components/ClientSide'
import { logMyAccountURL, logGeneralErrors } from './SplunkUtils'

import 'vtex.country-codes/locales'
import './style.global.css'

class bootstrap extends Component {
  constructor(props) {
    super(props)

    if (window.location.href.match('/account/orders')) {
      logMyAccountURL()
    }
  }

  componentDidCatch(error, info) {
    logGeneralErrors(error, info)
  }

  render() {
    return (
      <div className="vtex-account helvetica flex justify-around">
        <ClientSide>
          <AppRouter />
        </ClientSide>
      </div>
    )
  }
}

export default bootstrap
