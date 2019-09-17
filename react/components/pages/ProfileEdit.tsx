import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { withRouter } from 'vtex.my-account-commons/Router'
import { ContentWrapper } from 'vtex.my-account-commons'

import ProfileEditLoading from '../loaders/ProfileEditLoading'
import ProfileFormBox from '../Profile/ProfileFormBox'
import GET_PROFILE from '../../graphql/getProfile.gql'

export const headerConfig = {
  namespace: 'vtex-account__profile-edit',
  titleId: 'pages.profileEdit',
  backButton: {
    titleId: 'pages.profile',
    path: '/profile',
  },
}

class ProfileEdit extends Component<Props> {
  private handleGoBack = () => {
    this.props.history.push('/profile?success=true')
  }

  public render() {
    const { profile } = this.props

    return (
      <ContentWrapper {...headerConfig}>
        {({ handleError }: any) => (
          <ProfileFormBox
            profile={profile}
            onDataSave={this.handleGoBack}
            onError={handleError}
          />
        )}
      </ContentWrapper>
    )
  }
}

interface Props {
  data: { profile: Profile }
  profile: Profile
  history: any
}

const enhance = compose<Props, void>(
  graphql(GET_PROFILE),
  branch<Props>(
    ({ data }) => data.profile == null,
    renderComponent(ProfileEditLoading)
  ),
  withProps(({ data }: Props) => ({ profile: data.profile })),
  withRouter
)
export default enhance(ProfileEdit)
