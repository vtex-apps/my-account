import type { ReactNode } from 'react'
import React, { Children, Component } from 'react'
import 'vtex.country-codes/locales'

import AppRouter from './components/AppRouter'
import Wrapper from './components/MyAccountWrapper'
import { logGeneralErrors } from './utils/logger'

interface Props {
  blockDocument?: boolean
  children?: ReactNode
}

class MyAccount extends Component<Props> {
  public componentDidCatch(error: unknown, info: unknown) {
    if (window.__RUNTIME__.workspace === 'master') {
      logGeneralErrors(error, info)
    }
  }

  public render() {
    const { children, blockDocument } = this.props
    const hasChildren = Children.count(children) > 0

    return (
      <Wrapper>
        {hasChildren ? (
          children
        ) : (
          <div className="vtex-account helvetica flex justify-around">
            <AppRouter blockDocument={blockDocument} />
          </div>
        )}
      </Wrapper>
    )
  }
}

export default MyAccount
