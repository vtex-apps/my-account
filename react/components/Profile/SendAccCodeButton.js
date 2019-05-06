import React, { Fragment } from 'react'
import { injectIntl } from 'react-intl'
import { AuthService } from 'vtex.react-vtexid'
import { Button } from 'vtex.styleguide'

const SendAccCodeButton = ({
  children,
  variation,
  onSuccess = () => {}
}) => {
  return (
    <Fragment>
      <AuthService.SendAccessKey
        useNewSession
        onSuccess={onSuccess}
      >
        {({
          action,
          loading: loadingSendAccessKey,
        }) => (
          <Button
            size="small"
            onClick={action}
            isLoading={loadingSendAccessKey}
            variation={variation}
          >
            { children }
          </Button>
        )}
      </AuthService.SendAccessKey>
    </Fragment>
  )
}

export default injectIntl(SendAccCodeButton)
