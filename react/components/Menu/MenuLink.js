import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router-dom'

const MenuLink = ({ path, name, location }) => {
  return (
    <Link
      to={path}
      className={classnames(
        'f6 no-underline helvetica db hover-near-black pv6',
        { 'mid-gray': location.pathname !== path },
        { 'near-black': location.pathname === path },
      )}
    >
      {name}
    </Link>
  )
}

MenuLink.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default withRouter(MenuLink)
