import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'

import Example from './components/Example'

/* Router */
const ExtensionRouter = () => (
  <Fragment>
    <Route exact path="/custom-page/:param" component={Example} />
  </Fragment>
)

export default ExtensionRouter
