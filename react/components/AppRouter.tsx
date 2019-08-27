/* eslint-disable no-undef */
import React, { Component, Fragment } from 'react'
import Media from 'react-media'
import {
  Route,
  Switch,
  Redirect,
  HashRouter,
} from 'vtex.my-account-commons/Router'
import { ExtensionPoint } from 'vtex.render-runtime'

import Addresses from './pages/Addresses'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import AddressCreate from './pages/AddressCreate'
import AddressEdit from './pages/AddressEdit'
import Menu from './Menu'

class AppRouter extends Component {
  public state = { defaultPath: null }

  private handleDefaultPath = (defaultPath: string) => {
    this.setState({ defaultPath })
  }

  public static getSchema = () => {
    return {
      title: 'My Account Home',
      description: 'Home',
      type: 'object',
      properties: {
        defaultPath: {
          title: 'Default path',
          type: 'string',
          default: '/profile',
        },
      },
    }
  }

  public render() {
    const routes = [
      { path: '/addresses', component: Addresses },
      { path: '/addresses/new', component: AddressCreate },
      { path: '/addresses/edit/:id', component: AddressEdit },
      { path: '/profile', component: Profile },
      { path: '/profile/edit', component: ProfileEdit },
    ]

    const toRouteComponent = ({ path, component }: any) => (
      <Route exact key={path} path={path} component={component} />
    )

    const shouldRedirectOrder = vtex && vtex.orderListRendered

    return (
      <div className="w-100 mw9 pv7-m pv9-l flex">
        <ExtensionPoint
          id="my-account-defaultPage"
          onSetDefaultPath={this.handleDefaultPath}
        />
        {this.state.defaultPath && (
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
                      to={
                        shouldRedirectOrder ? '/orders' : this.state.defaultPath
                      }
                    />
                    <ExtensionPoint id="my-account-pages" />
                  </Switch>
                ) : (
                  <Fragment>
                    <Menu />
                    <Switch>
                      {routes.map(toRouteComponent)}
                      <Redirect
                        exact
                        from="/"
                        to={
                          shouldRedirectOrder
                            ? '/orders'
                            : this.state.defaultPath
                        }
                      />
                      <ExtensionPoint id="my-account-pages" />
                    </Switch>
                  </Fragment>
                )
              }
            </Media>
          </HashRouter>
        )}
      </div>
    )
  }
}

export default AppRouter
