/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, Fragment } from 'react'
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl'
import { compose } from 'recompose'
import { ExtensionPoint } from 'vtex.render-runtime'
import { AuthService } from 'vtex.react-vtexid'
import { ModalDialog } from 'vtex.styleguide'

import UserInfo from './UserInfo'
import MenuLink from './MenuLink'
import { withSettings, Settings } from '../shared/withSettings'
import styles from '../../styles.css'

function renderLinks(links: Link[], displayMyCards: boolean | null) {
  let linksToDisplay = links
  if (displayMyCards === false) {
    linksToDisplay = links.filter(link => link.path !== '/cards')
  }

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
    const { intl, settings } = this.props

    return (
      <aside
        className={`${styles.menu} pv9 pv0-m-2 ph9 ph7-m ph8-l w-20-m w-100`}>
        <UserInfo />
        <nav className={`${styles.menuLinks}`}>
          <ExtensionPoint
            id="my-account-menu"
            render={(links: Link[]) =>
              renderLinks(links, settings ? settings.showMyCards : false)
            }
          />
          <AuthService.RedirectLogout returnUrl="/">
            {({ action: logout }: any) => (
              <Fragment>
                <div
                  className={`
                    ${styles.menuLink}
                    f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap c-muted-1 b--transparent pointer
                  `}
                  onClick={this.handleModalToggle}>
                  <FormattedMessage id="vtex.store-messages@0.x::pages.logout" />
                </div>
                <ModalDialog
                  centered
                  confirmation={{
                    onClick: logout,
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
                  onClose={this.handleModalToggle}>
                  <span className="t-heading-5 pa6">
                    <FormattedMessage id="vtex.store-messages@0.x::logoutModal.title" />
                  </span>
                </ModalDialog>
              </Fragment>
            )}
          </AuthService.RedirectLogout>
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
}

export default compose<Props, {}>(
  injectIntl,
  withSettings
)(Menu)
