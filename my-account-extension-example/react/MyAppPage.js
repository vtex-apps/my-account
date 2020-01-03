import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
// Your component pages
import UserSupport from './components/UserSupport'

const MyAppPage = () => (
  <Fragment>
    <Route exact path="/support" component={UserSupport} />
  </Fragment>
)

export default MyAppPage
