import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Media from 'react-media'
import Menu from './Menu/Menu'
import Addresses from '../pages/addresses/Addresses'
import Profile from '../pages/profile/Profile'
import Payments from '../pages/payments/Payments'
import PaymentCreate from '../pages/payment-create/PaymentCreate'
import ProfileEdit from '../pages/profile-edit/ProfileEdit'
import AddressCreate from '../pages/address-create/AddressCreate'
import AddressEdit from '../pages/address-edit/AddressEdit'

const AppRouter = () => {
  const routes = [
    { path: '/addresses', component: Addresses },
    { path: '/addresses/new', component: AddressCreate },
    { path: '/addresses/edit/:id', component: AddressEdit },
    { path: '/profile', component: Profile },
    { path: '/profile/edit', component: ProfileEdit },
    { path: '/payments', component: Payments },
    { path: '/payments/new', component: PaymentCreate },
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
