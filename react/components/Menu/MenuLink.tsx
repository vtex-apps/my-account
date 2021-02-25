import React, { FunctionComponent } from 'react'
import {
  Link,
  withRouter,
  RouteComponentProps,
} from 'vtex.my-account-commons/Router'

const MenuLink: FunctionComponent<Props> = ({ path, name, location, className, classNameActive }) => {
  return (
    <Link
      to={path}
      className={`${className}
        vtex-account_menu-link f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap ${location.pathname.indexOf(path) === -1
          ? 'c-muted-1 b--transparent'
          : `c-on-base b b--action-primary ${classNameActive}`
        }`}
    >
      {name}
    </Link>
  )
}

interface Props extends RouteComponentProps {
  path: string
  name: string
  className: string
  classNameActive: string
}

export default withRouter(MenuLink)
