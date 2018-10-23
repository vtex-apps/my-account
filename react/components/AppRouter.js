import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Media from 'react-media'
import { ExtensionPoint } from 'render'
import Menu from './Menu/Menu'
import Addresses from './pages/Addresses'
import Profile from './pages/Profile'
import Payments from './pages/Payments'
import ProfileEdit from './pages/ProfileEdit'
import AddressCreate from './pages/AddressCreate'
import AddressEdit from './pages/AddressEdit'

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

  const shouldRedirectOrder = vtex && vtex.orderListRendered

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
