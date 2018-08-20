import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router-dom'

const MenuLink = ({ path, name, location }) => {
  return (
    <Link
      to={path}
      className={classnames(
        'f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap',
        { 'mid-gray b--transparent': location.pathname.indexOf(path) === -1 },
        { 'near-black b b--blue': location.pathname.indexOf(path) !== -1 },
      )}
    >
      {name}
    </Link>
  )
}

MenuLink.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default withRouter(MenuLink)
