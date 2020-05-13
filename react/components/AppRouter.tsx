import React, { Component, Fragment, ComponentClass } from 'react'
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
  public state = { defaultPath: '' }

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

  public mapRouteComponent = ({
    path,
    component,
  }: {
    path: string
    component: ComponentClass<void, unknown>
  }) => <Route exact key={path} path={path} component={component} />

  public render() {
    const routes = [
      { path: '/addresses', component: Addresses },
      { path: '/addresses/new', component: AddressCreate },
      { path: '/addresses/edit/:id', component: AddressEdit },
      { path: '/profile', component: Profile },
      { path: '/profile/edit', component: ProfileEdit },
    ]

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
                    {routes.map(this.mapRouteComponent)}
                    <Redirect exact from="/" to={this.state.defaultPath} />
                    <ExtensionPoint id="my-account-pages" />
                  </Switch>
                ) : (
                  <Fragment>
                    <Menu />
                    <Switch>
                      {routes.map(this.mapRouteComponent)}
                      <Redirect exact from="/" to={this.state.defaultPath} />
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
