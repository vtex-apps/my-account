import React, { Component } from 'react'
import 'vtex.country-codes/locales'

import AppRouter from './components/AppRouter'
import Wrapper from './components/MyAccountWrapper'
import { logGeneralErrors } from './utils/splunk'

interface MyAccountProps {
  blockDocument?: boolean
}

class MyAccount extends Component<MyAccountProps> {
  constructor(props: MyAccountProps) {
    super(props)
  }
  public componentDidCatch(error: unknown, info: unknown) {
    if (window.__RUNTIME__.workspace === 'master') {
      logGeneralErrors(error, info)
    }
  }

  public render() {
    return (
      <Wrapper>
        <div className="vtex-account helvetica flex justify-around">
          <AppRouter blockDocument={this.props.blockDocument} />
        </div>
      </Wrapper>
    )
  }
}

export default MyAccount
