import React, { FunctionComponent } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, withProps, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'

import GetGreeting from '../../graphql/getGreeting.gql'
import UserPicture from './ProfilePicture/UserPicture'
import UserInfoLoading from './UserInfoLoading'

const UserInfo: FunctionComponent<Props> = ({ profile }) => {
  return (
    <div className="vtex-account__user-info flex flex-wrap items-end mb7">
      <div className="vtex-account__user-image relative mr5 h3 w3">
        <UserPicture imagePath={profile.profilePicture} />
      </div>
      {profile.firstName ? (
        <div>
          <div className="vtex-account__user-greeting f5 fw3 c-muted-1 mb2 mt0-l mt2-m">
            <FormattedMessage id="userInfo.greeting" />,
          </div>
          <div className="vtex-account__user-name f4 c-on-base fw3 nowrap">
            {profile.firstName}!
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

interface ProfileData {
  firstName: string
  lastName: string
  profilePicture?: string
}

interface Props {
  profile: ProfileData
  data: { profile: ProfileData }
}

const enhance = compose<Props, {}>(
  graphql(GetGreeting),
  branch<Props>(
    ({ data }) => data.profile == null,
    renderComponent(UserInfoLoading)
  ),
  withProps(({ data }: Props) => ({ profile: data.profile }))
)
export default enhance(UserInfo)
