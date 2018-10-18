import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Media from 'react-media'
import { ExtensionPoint } from 'render'
import Menu from './Menu/Menu'
import Addresses from '../pages/addresses/Addresses'
import Profile from '../pages/profile/Profile'
import Payments from '../pages/payments/Payments'
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
  ]

  const toRouteComponent = ({ path, component }) => (
    <Route exact key={path} path={path} component={component} />
  )

  let shouldRedirectOrder = false

  if(vtex) {
    shouldRedirectOrder = vtex.orderListRendered
  }

  return (
    <HashRouter>
      <Media query="(max-width: 57em)">
        {matches =>
          matches ? (
            <main className="vh-100">
              <Switch>
                <Route exact path="/" component={Menu} />
                {routes.map(toRouteComponent)}
                <Redirect exact from="/" to={ shouldRedirectOrder ? "/orders" : "/profile"} />
                <ExtensionPoint id="routes" />
              </Switch>
            </main>
          ) : (
            <div className="flex pv7-m pv9-l">
              <Menu />
              <main className="flex-auto pt5">
                <Switch>
                  {routes.map(toRouteComponent)}
                  <Redirect exact from="/" to={ shouldRedirectOrder ? "/orders" : "/profile"} />
                  <ExtensionPoint id="routes" />
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
