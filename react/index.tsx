import React, { Component } from 'react'
import 'vtex.country-codes/locales'

import AppRouter from './components/AppRouter'
import Wrapper from './components/MyAccountWrapper'
import { logGeneralErrors } from './utils/splunk'

interface Props {
  blockDocument?: boolean
  validateUniqueDocument?: boolean
  cleanMaskDocument?: boolean
}

class MyAccount extends Component<Props> {
  public componentDidCatch(error: unknown, info: unknown) {
    if (window.__RUNTIME__.workspace === 'master') {
      logGeneralErrors(error, info)
    }
  }

  public render() {
    return (
      <Wrapper>
        <div className="vtex-account helvetica flex justify-around">
          <AppRouter blockDocument={this.props.blockDocument} validateUniqueDocument={this.props.validateUniqueDocument} cleanMaskDocument={this.props.cleanMaskDocument} />
        </div>
      </Wrapper>
    )
  }
}

export default MyAccount
