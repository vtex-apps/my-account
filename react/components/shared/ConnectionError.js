import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { Alert } from 'vtex.styleguide'

const ConnectionError = ({ onReload, intl }) => {
  return (
    <div className="mt7">
      <Alert
        type="error"
        action={{
          label: intl.formatMessage({ id: 'error.reload' }),
          onClick: onReload,
        }}
      >
        {intl.formatMessage({ id: 'error.connection' })}
      </Alert>
    </div>
  )
}

ConnectionError.propTypes = {
  onReload: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(ConnectionError)
