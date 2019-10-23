import React, { Component } from 'react'
import 'vtex.country-codes/locales'

import AppRouter from './components/AppRouter'
import Wrapper from './components/MyAccountWrapper'
import { logGeneralErrors } from './utils/splunk'

class MyAccount extends Component {
  public componentDidCatch(error: unknown, info: unknown) {
    if (window.__RUNTIME__.workspace === 'master') {
      logGeneralErrors(error, info)
    }
  }

  public render() {
    return (
      <Wrapper>
        <div className="vtex-account helvetica flex justify-around">
          <AppRouter />
        </div>
      </Wrapper>
    )
  }
}

export default MyAccount
