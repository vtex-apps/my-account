import React, { FunctionComponent } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'

import GREETING, { Result } from '../../graphql/customerGreeting.gql'
import Loading from './UserInfoLoading'
import PictureRenderer from './ProfilePicture/PictureRenderer'

const UserInfo: FunctionComponent<Props> = ({ profilePicture, firstName }) => {
  return (
    <div className="vtex-account__user-info flex flex-wrap items-end mb7">
      <div className="vtex-account__user-image relative mr5 h3 w3">
        <PictureRenderer imagePath={profilePicture} />
      </div>
      {firstName ? (
        <div>
          <div className="vtex-account__user-greeting f5 fw3 c-muted-1 mb2 mt0-l mt2-m">
            <FormattedMessage id="userInfo.greeting" />,
          </div>
          <div className="vtex-account__user-name f4 c-on-base fw3 nowrap">
            {firstName}!
          </div>
        </div>
      ) : (
        <div className="vtex-account__user-greeting f4 fw3 nowrap">
          <FormattedMessage id="userInfo.greeting" />!
        </div>
      )}
    </div>
  )
}

interface Props {
  firstName: string
  profilePicture?: string
  loading: boolean
}

const enhance = compose<Props, Record<string, unknown>>(
  graphql<Record<string, unknown>, Result, Record<string, unknown>, Props>(
    GREETING,
    {
      props: ({ data }) => ({
        firstName: data?.profile?.firstName ?? '',
        profilePicture: data?.profile?.profilePicture ?? undefined,
        loading: data ? data.loading : false,
      }),
    }
  ),
  branch<Props>(({ loading }) => loading, renderComponent(Loading))
)

export default enhance(UserInfo)
