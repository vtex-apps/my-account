import React, { FunctionComponent } from 'react'
import { Link, withRouter } from 'vtex.my-account-commons/Router'

import styles from '../../styles.css'

const MenuLink: FunctionComponent<Props> = ({ path, name, location }) => {
  return (
    <Link
      to={path}
      className={`
          ${styles.menuLink}
          f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap ${
            location.pathname.indexOf(path) === -1
              ? 'c-muted-1 b--transparent'
              : 'c-on-base b b--action-primary'
          }`}>
      {name}
    </Link>
  )
}

interface Props {
  path: string
  name: string
  location: {
    pathname: string
  }
}

export default withRouter(MenuLink)
