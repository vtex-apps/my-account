import React, { FunctionComponent } from 'react'
import { injectIntl } from 'react-intl'
import { AuthService } from 'vtex.react-vtexid'
import { Button } from 'vtex.styleguide'

const SendAccCodeButton: FunctionComponent<Props> = ({
  children,
  variation,
  onSuccess = () => {},
}) => {
  return (
    <AuthService.SendAccessKey useNewSession onSuccess={onSuccess}>
      {({ action, loading: loadingSendAccessKey }: any) => (
        <Button
          size="small"
          onClick={action}
          isLoading={loadingSendAccessKey}
          variation={variation}
        >
          {children}
        </Button>
      )}
    </AuthService.SendAccessKey>
  )
}

interface Props {
  variation: string
  onSuccess?: () => void
}

export default injectIntl(SendAccCodeButton)
