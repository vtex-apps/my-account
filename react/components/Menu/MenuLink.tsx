import type { FunctionComponent } from 'react'
import React from 'react'
import type { RouteComponentProps } from 'vtex.my-account-commons/Router'
import { Link, withRouter } from 'vtex.my-account-commons/Router'

const MenuLink: FunctionComponent<Props> = ({ path, name, location }) => {
  return (
    <Link
      to={path}
      className={`
        vtex-account_menu-link f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap ${
          location.pathname.indexOf(path) === -1
            ? 'c-muted-1 b--transparent'
            : 'c-on-base b b--action-primary'
        }`}
    >
      {name}
    </Link>
  )
}

interface Props extends RouteComponentProps {
  path: string
  name: string
}

export default withRouter(MenuLink)
