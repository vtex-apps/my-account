import React, { Component } from 'react'
import UserInfo from './UserInfo'
import MenuLinksList from './MenuLinksList'
import { ExtensionPoint } from 'render'

class Menu extends Component {
  state = {
    hasExtension: null,
  }

  handleExtension = hasExtension => {
    this.setState({ hasExtension })
    throw new Error('um erro de teste')
  }

  render() {
    const { hasExtension } = this.state

    return (
      <aside className="vtex-account__menu pv9 pv0-m-2 ph9 ph7-m ph8-l w-20-m w-100">
        <UserInfo />
        <ExtensionPoint id="menu" hasExtension={this.handleExtension} />
        {hasExtension === false && <MenuLinksList />}
      </aside>
    )
  }
}

export default Menu
