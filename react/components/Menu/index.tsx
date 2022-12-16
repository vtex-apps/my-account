/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, Fragment } from 'react'
import type { InjectedIntlProps } from 'react-intl'
import { injectIntl, FormattedMessage } from 'react-intl'
import { compose } from 'recompose'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'
import { ModalDialog } from 'vtex.styleguide'
import { withCssHandles } from 'vtex.css-handles'

import UserInfo from './UserInfo'
import MenuLink from './MenuLink'
import type { Settings } from '../shared/withSettings'
import { withSettings } from '../shared/withSettings'
import getRedirectLogout from '../../utils/getRedirectLogout'

const CSS_HANDLES = ['css', 'menu', 'menuLinks', 'menuLink'] as const

interface RenderLinksOptions {
  showMyCards: boolean | null
  showMyOrders: boolean | null
  showMyAddresses: boolean | null
}

function renderLinks(
  links: Link[],
  { showMyCards, showMyOrders, showMyAddresses }: RenderLinksOptions
) {
  const linksToDisplay = links.filter(link => {
    if (showMyCards === false && link.path === '/cards') {
      return false
    }

    if (showMyOrders === false && link.path === '/orders') {
      return false
    }

    if (showMyAddresses === false && link.path === '/addresses') {
      return false
    }

    return true
  })

  return linksToDisplay.map(({ name, path }) => (
    <MenuLink path={path} name={name} key={name} />
  ))
}

class Menu extends Component<Props, { isModalOpen: boolean }> {
  public state = { isModalOpen: false }

  private handleModalToggle = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }))
  }

  public render() {
    const { cssHandles, intl, settings, runtime } = this.props
    const {
      showMyCards = false,
      showMyOrders = false,
      showMyAddresses = false,
    } = settings || {}

    return (
      <aside
        className={`${cssHandles.menu} pv9 pv0-m-2 ph9 ph7-m ph8-l w-20-m w-100`}
      >
        <UserInfo />
        <nav className={cssHandles.menuLinks}>
          <ExtensionPoint
            id="my-account-menu"
            render={(links: Link[]) =>
              renderLinks(links, {
                showMyCards,
                showMyOrders,
                showMyAddresses,
              })
            }
          />
          <Fragment>
            <div
              className={`
                    ${cssHandles.menuLink}
                    f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap c-muted-1 b--transparent pointer
                  `}
              onClick={this.handleModalToggle}
            >
              <FormattedMessage id="vtex.store-messages@0.x::pages.logout" />
            </div>
            <ModalDialog
              centered
              confirmation={{
                onClick: getRedirectLogout(runtime),
                label: intl.formatMessage({
                  id: 'vtex.store-messages@0.x::pages.logout',
                }),
              }}
              cancelation={{
                onClick: this.handleModalToggle,
                label: intl.formatMessage({
                  id: 'vtex.store-messages@0.x::logoutModal.cancel',
                }),
              }}
              isOpen={this.state.isModalOpen}
              onClose={this.handleModalToggle}
            >
              <span className="t-heading-5 pa6">
                <FormattedMessage id="vtex.store-messages@0.x::logoutModal.title" />
              </span>
            </ModalDialog>
          </Fragment>
        </nav>
      </aside>
    )
  }
}

interface Link {
  name: string
  path: string
}

interface Props extends InjectedIntlProps {
  settings?: Settings
  cssHandles: CssHandles<typeof CSS_HANDLES>
  runtime: Runtime
}

export default compose<Props, Record<string, unknown>>(
  injectIntl,
  withSettings,
  withCssHandles(CSS_HANDLES),
  withRuntimeContext
)(Menu)
