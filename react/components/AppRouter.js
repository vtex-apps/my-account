import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Media from 'react-media'
import Menu from './Menu/Menu'
import Addresses from '../pages/Addresses'
import Profile from '../pages/Profile'
import PaymentData from '../pages/PaymentData'
import ProfileEdit from '../pages/ProfileEdit'

const AppRouter = () => {
  const routes = [
    { path: '/addresses', component: Addresses },
    { path: '/profile', component: Profile },
    { path: '/profile/edit', component: ProfileEdit },
    { path: '/payment-data', component: PaymentData },
  ]

  return (
    <HashRouter>
      <Media query="(max-width: 40em)">
        {matches =>
          matches ? (
            <main className="pa6 vh-100">
              <Switch>
                <Route exact path="/" component={Menu} />
                {routes.map(({ path, component }) => (
                  <Route exact key={path} path={path} component={component} />
                ))}
              </Switch>
            </main>
          ) : (
            <div className="flex pl7 pr9 pv9">
              <Menu />
              <main className="flex-auto pt6">
                <Switch>
                  {routes.map(({ path, component }) => (
                    <Route exact key={path} path={path} component={component} />
                  ))}
                  <Redirect from="/" to="/profile" />
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
