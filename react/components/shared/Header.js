import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Link } from 'react-router-dom'
import ArrowBack from '@vtex/styleguide/lib/icon/ArrowBack'

const Header = ({ title, intl }) => {
  return (
    <header>
      <Link to="/" className="helvetica ttu blue no-underline f7 b db mb5 dn-ns">
        <ArrowBack size={12} color="currentColor" />
        <span className="ml2">{intl.formatMessage({ id: 'pages.myAccount' })}</span>
      </Link>
      <h1 className="helvetica normal near-black f3 f2-ns ma0">{title}</h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  intl: intlShape.isRequired,
}

export default injectIntl(Header)
