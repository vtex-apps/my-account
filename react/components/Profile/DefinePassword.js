import React, { Fragment } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { AuthService } from 'vtex.react-vtexid'
import { Input, Button } from 'vtex.styleguide'

const DefinePassword = ({ intl, setToken, currentToken }) => {
  return (
    <Fragment>
      <div className="t-heading-6 tc pb4">
        <FormattedMessage id="personalData.editePassword.title" />
      </div>
      <AuthService.SendAccessKey
        useNewSession
      >
        {({
          action,
          loading: loadingSendAccessKey,
        }) => (
          <Button
            block
            size="small"
            onClick={action}
            isLoading={loadingSendAccessKey}
          >
            <FormattedMessage id="personalData.sendCode" />
          </Button>
        )}
      </AuthService.SendAccessKey>
      <div className="pt4 pb4">
        <Input
          value={currentToken || ''}
          onChange={e => {
            setToken(e.target.value)
          }}
          label={intl.formatMessage({ id: 'personalData.code' })}
        />
      </div>
    </Fragment>
  )
}

export default injectIntl(DefinePassword)
