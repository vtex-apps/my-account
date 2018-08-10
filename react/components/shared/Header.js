import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { IconArrowBack } from 'vtex.styleguide'
import ClearButton from './ClearButton'

const Header = ({ title, intl, history }) => {
  const navigateHome = () => {
    history.push('/')
  }

  return (
    <header>
      <div className="dn-ns">
        <ClearButton onClick={navigateHome}>
          <IconArrowBack size={12} color="currentColor" />
          <span className="ml2">
            {intl.formatMessage({ id: 'pages.myAccount' })}
          </span>
        </ClearButton>
      </div>
      <h1 className="b near-black mb0 mt4 f3">{title}</h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  intl: intlShape.isRequired,
  history: PropTypes.any,
}

export default withRouter(injectIntl(Header))
