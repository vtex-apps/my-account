/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react'
import {
  injectIntl,
  FormattedMessage,
  defineMessages,
  InjectedIntlProps,
} from 'react-intl'
import { ExtensionPoint } from 'render'
import { compose } from 'recompose'
import { AuthService } from 'vtex.react-vtexid'
import { ModalDialog } from 'vtex.styleguide'

import MenuLink from './MenuLink'
import { withSettings, Settings } from '../shared/withSettings'

const messages = defineMessages({
  logout: { id: 'pages.logout', defaultMessage: '' },
  addresses: { id: 'pages.addresses', defaultMessage: '' },
  profile: { id: 'pages.profile', defaultMessage: '' },
  cancel: { id: 'logoutModal.cancel', defaultMessage: '' },
})

interface RenderLinksOptions {
  showMyCards: boolean | null
}

function renderLinks(links: Link[], { showMyCards }: RenderLinksOptions) {
  const linksToDisplay = links.filter(
    link => showMyCards !== false || link.path !== '/cards'
  )

  return linksToDisplay.map(({ name, path }) => (
    <MenuLink path={path} name={name} key={name} />
  ))
}

class MenuLinksList extends Component<Props> {
  public state = { isModalOpen: false }

  private handleModalToggle = () => {
    this.setState((prevState: { isModalOpen: boolean }) => ({
      isModalOpen: !prevState.isModalOpen,
    }))
  }

  public render() {
    const { intl, settings } = this.props
    const { showMyCards = false } = settings || {}

    const defaultLinks = [
      {
        name: intl.formatMessage(messages.profile),
        path: '/profile',
      },
      {
        name: intl.formatMessage(messages.addresses),
        path: '/addresses',
      },
    ]

    return (
      <nav className="vtex-account__menu-links">
        <ExtensionPoint
          id="menu-links-before"
          render={(links: Link[]) => renderLinks(links, { showMyCards })}
        />
        {renderLinks(defaultLinks, { showMyCards })}
        <ExtensionPoint
          id="menu-links-after"
          render={(links: Link[]) => renderLinks(links, { showMyCards })}
        />
        <AuthService.RedirectLogout returnUrl="/">
          {({ action: logout }: any) => (
            <Fragment>
              <a
                className="vtex-account_menu-link f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap c-muted-1 b--transparent pointer"
                onClick={this.handleModalToggle}
              >
                <FormattedMessage id="pages.logout" />
              </a>
              <ModalDialog
                centered
                confirmation={{
                  onClick: logout,
                  label: intl.formatMessage(messages.logout),
                }}
                cancelation={{
                  onClick: this.handleModalToggle,
                  label: intl.formatMessage(messages.cancel),
                }}
                isOpen={this.state.isModalOpen}
                onClose={this.handleModalToggle}
              >
                <span className="t-heading-5 pa6">
                  <FormattedMessage id="logoutModal.title" />
                </span>
              </ModalDialog>
            </Fragment>
          )}
        </AuthService.RedirectLogout>
      </nav>
    )
  }
}

interface Link {
  name: string
  path: string
}

interface Props extends InjectedIntlProps {
  settings?: Settings
}

export default compose<Props, Record<string, unknown>>(
  injectIntl,
  withSettings
)(MenuLinksList)
