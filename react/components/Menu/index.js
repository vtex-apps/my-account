import React, { Component, Fragment } from 'react'
import UserInfo from './UserInfo'
import MenuLinksList from './MenuLinksList'
import { injectIntl, FormattedMessage } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import { AuthService } from 'vtex.react-vtexid'
import { ModalDialog } from 'vtex.styleguide'
import MenuLink from './MenuLink'

class Menu extends Component {

  state = { isModalOpen: false }

  handleModalToggle = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }))
  }

  render() {
    const { intl } = this.props

    return (
      <aside className="vtex-account__menu pv9 pv0-m-2 ph9 ph7-m ph8-l w-20-m w-100">
        <UserInfo />
        <ExtensionPoint
          id="my-account-menu"
          render={links =>
            links.map(({ name, path }) => (
              <MenuLink path={path} name={name} key={name} />
            ))
          } />
        <AuthService.RedirectLogout returnUrl="/">
          {({ action: logout }) => (
            <Fragment>
              <div
                className={`vtex-account_menu-link f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap c-muted-1 b--transparent pointer`}
                onClick={this.handleModalToggle}>
                <FormattedMessage id="pages.logout" />
              </div>

              <ModalDialog
                centered
                confirmation={{
                  onClick: logout,
                  label: intl.formatMessage({ id: "pages.logout" }),
                }}
                cancelation={{
                  onClick: this.handleModalToggle,
                  label: intl.formatMessage({ id: "logoutModal.cancel" }),
                }}
                isOpen={this.state.isModalOpen}
                onClose={this.handleModalToggle}
                >
                <span className="t-heading-5 pa6" >
                  <FormattedMessage id="logoutModal.title" />
                </span>
              </ModalDialog>
            </Fragment>
          )}
        </AuthService.RedirectLogout>
      </aside>
    )
  }
}

export default injectIntl(Menu)
