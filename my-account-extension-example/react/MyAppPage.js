import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'
// Your component pages
import UserSupport from './components/UserSupport'

const MyAppPage = () => (
  <Fragment>
    <Route exact path="/support" component={UserSupport} />
  </Fragment>
)

export default MyAppPage
