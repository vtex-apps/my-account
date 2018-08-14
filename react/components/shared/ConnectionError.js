import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { Alert } from 'vtex.styleguide'

const ConnectionError = ({ intl }) => {
  return (
    <div className="mt7">
      <Alert
        type="error"
        action={{
          label: intl.formatMessage({ id: 'error.reload' }),
          onClick: () => console.log('Went back!'),
        }}
      >
        {intl.formatMessage({ id: 'error.connection' })}
      </Alert>
    </div>
  )
}

ConnectionError.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(ConnectionError)
