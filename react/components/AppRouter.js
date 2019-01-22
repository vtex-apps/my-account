import React, { Fragment } from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Media from 'react-media'
import { ExtensionPoint } from 'vtex.render-runtime'
import Menu from './Menu/Menu'
import Addresses from './pages/Addresses'
import Profile from './pages/Profile'
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
  ]

  // eslint-disable-next-line
  const toRouteComponent = ({ path, component }) => (
    <Route exact key={path} path={path} component={component} />
  )

  // eslint-disable-next-line
  const shouldRedirectOrder = vtex && vtex.orderListRendered

  return (
    <div className="w-100 mw9 pv7-m pv9-l flex">
      <HashRouter>
        <Media query="(max-width: 45em)">
          {matches =>
            matches ? (
              <Switch>
                <Route exact path="/" component={Menu} />
                {routes.map(toRouteComponent)}
                <Redirect
                  exact
                  from="/"
                  to={shouldRedirectOrder ? '/orders' : '/profile'}
                />
                <ExtensionPoint id="routes" />
              </Switch>
            ) : (
              <Fragment>
                <Menu />
                <Switch>
                  {routes.map(toRouteComponent)}
                  <Redirect
                    exact
                    from="/"
                    to={shouldRedirectOrder ? '/orders' : '/profile'}
                  />
                  <ExtensionPoint id="routes" />
                </Switch>
              </Fragment>
            )
          }
        </Media>
      </HashRouter>
    </div>
  )
}

export default AppRouter
