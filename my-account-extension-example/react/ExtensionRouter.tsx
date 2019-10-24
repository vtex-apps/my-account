import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'

import ExamplePage from './components/Page'

/* Router */
const ExtensionRouter = () => (
  <Fragment>
    <Route exact path="/custom-page/:param" component={ExamplePage} />
  </Fragment>
)

export default ExtensionRouter
