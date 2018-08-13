import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { IconArrowBack } from 'vtex.styleguide'
import ClearButton from './ClearButton'

const Header = ({
  titleId,
  shouldAlwaysShowBackButton,
  backButtonId,
  backButtonPath,
  intl,
  history,
}) => {
  return (
    <header>
      <div className={shouldAlwaysShowBackButton ? '' : 'dn-ns'}>
        <ClearButton onClick={() => history.push(backButtonPath)}>
          <IconArrowBack size={12} color="currentColor" />
          <span className="ml2">
            {intl.formatMessage({ id: backButtonId })}
          </span>
        </ClearButton>
      </div>
      <h1 className="b near-black mb0 mt4 f3">
        {intl.formatMessage({ id: titleId })}
      </h1>
    </header>
  )
}

Header.defaultProps = {
  shouldAlwaysShowBackButton: false,
  backButtonId: 'pages.myAccount',
  backButtonPath: '/',
}

Header.propTypes = {
  titleId: PropTypes.string,
  shouldAlwaysShowBackButton: PropTypes.bool.isRequired,
  backButtonId: PropTypes.string.isRequired,
  backButtonPath: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  history: PropTypes.any,
}

export default withRouter(injectIntl(Header))
