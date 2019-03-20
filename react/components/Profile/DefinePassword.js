import React, { Component, Fragment } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { AuthState, AuthService } from 'vtex.react-vtexid'
import { Input, Button } from 'vtex.styleguide'
import PasswordValidator from './PasswordValidator'

class DefinePassword extends Component {
  render() {
    const {
      intl,
      setToken,
      currentToken,
    } = this.props

    return (
      <Fragment>
        <div className="t-heading-6 tc pb4">
          <FormattedMessage id="personalData.editePassword.title" />
        </div>
        <AuthService.SendAccessKey
          useNewSession
          onSuccess={() => {
            console.log('success send access key')
          }}
          onFailure={err =>
            console.log(err,'error')
          }>
          {({
            action,
            loading: loadingSendAccessKey,
          }) => (
            <div className="tc">
              <Button
                block
                size="small"
                onClick={action}
                isLoading={loadingSendAccessKey}
              >
                <FormattedMessage id="personalData.sendCode" />
              </Button>
            </div>
          )}
        </AuthService.SendAccessKey>
        <div className="pt4">
          <Input
            value={currentToken || ''}
            onChange={e => {
              const newToken = e.target.value
              setToken(newToken) // check this in myuser code
            }}
            label={intl.formatMessage({ id: 'personalData.code' })}
          />
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(DefinePassword)
