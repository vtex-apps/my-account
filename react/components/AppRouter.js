import React, { Component, Fragment } from 'react'
import {
  Route,
  Switch,
  Redirect,
  HashRouter,
} from 'vtex.my-account-commons/Router'
import Media from 'react-media'
import { ExtensionPoint } from 'render'
import Menu from './Menu'
import Addresses from './pages/Addresses'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import AddressCreate from './pages/AddressCreate'
import AddressEdit from './pages/AddressEdit'

class AppRouter extends Component {
  state = { defaultPath: null }

  constructor(props) {
    super(props)

    // Workaround for bug in the package `history`
    // Possible fix, use this version of `history`:
    // https://github.com/ReactTraining/history/pull/578
    this.baseElement = document.querySelector('base')
    this.baseHref = this.baseElement.href
    this.baseElement.removeAttribute('href')
  }

  handleDefaultPath = path => {
    this.setState({ defaultPath: path }, () => {
      // From the workaround above
      this.baseElement.setAttribute('href', this.baseHref)
      debugger
    })
  }

  render() {
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
        <ExtensionPoint
          id="defaultRoute"
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
                      <ExtensionPoint id="routes" />
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

AppRouter.getSchema = () => {
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

export default AppRouter
