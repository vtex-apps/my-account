/* eslint-disable react/jsx-handler-names */
import React, { Component } from 'react'
import { ExtensionPoint } from 'render'

import UserInfo from './UserInfo'
import MenuLinksList from './MenuLinksList'

class Menu extends Component {
  public state = {
    hasExtension: null,
  }

  private handleExtension = (hasExtension: any) => {
    this.setState({ hasExtension })
  }

  public render() {
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
