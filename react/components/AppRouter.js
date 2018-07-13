import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Media from 'react-media'
import Menu from './Menu/Menu'
import Addresses from '../pages/Addresses'
import PersonalData from '../pages/PersonalData'
import PaymentData from '../pages/PaymentData'
import Loading from '../pages/Loading'

const AppRouter = () => {
  const mainRoutes = [
    <Route key="1" path="/addresses" component={Addresses} />,
    <Route key="2" path="/personal_data" component={PersonalData} />,
    <Route key="3" path="/payment_data" component={PaymentData} />,
    <Route key="4" path="/my_orders" component={Loading} />,
  ]

  return (
    <HashRouter>
      <Media query="(max-width: 40em)">
        {matches =>
          matches ? (
            <main className="pa6 vh-100">
              <Switch>
                <Route exact path="/" component={Menu} />
                {mainRoutes}
              </Switch>
            </main>
          ) : (
            <div className="flex pl7 pr9 pv9">
              <Menu />
              <main className="flex-auto pt8">
                <Switch>
                  {mainRoutes}
                  <Redirect from="/" to="/addresses" />
                </Switch>
              </main>
            </div>
          )
        }
      </Media>
    </HashRouter>
  )
}

export default AppRouter
