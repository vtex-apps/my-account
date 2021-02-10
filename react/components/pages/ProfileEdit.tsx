import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { withRouter } from 'vtex.my-account-commons/Router'

import { withContentWrapper } from '../shared/withContentWrapper'
import ProfileEditLoading from '../loaders/ProfileEditLoading'
import ProfileFormBox from '../Profile/ProfileFormBox'
import GET_PROFILE from '../../graphql/getProfile.gql'

export const headerConfig = {
  titleId: 'vtex.store-messages@0.x::pages.profileEdit',
  backButton: {
    titleId: 'vtex.store-messages@0.x::pages.profile',
    path: '/profile',
  },
}

class ProfileEdit extends Component<Props> {
  private handleGoBack = () => {
    this.props.history.push('/profile?success=true')
  }

  public render() {
    const { profile, handleError, blockDocument } = this.props

    return (
      <ProfileFormBox
        profile={profile}
        onDataSave={this.handleGoBack}
        onError={handleError}
        blockDocument={blockDocument}
      />
    )
  }
}

interface Props extends InjectedContentWrapperProps {
  data: { profile: Profile }
  profile: Profile
  history: any
  blockDocument?: boolean
}

const enhance = compose<Props, { blockDocument?: boolean}>(
  graphql(GET_PROFILE),
  branch<Props>(
    ({ data }) => data.profile == null,
    renderComponent(ProfileEditLoading)
  ),
  withProps(({ data, blockDocument }: Props) => {
    return { profile: data.profile, blockDocument }
  }),
  withRouter,
  withContentWrapper({ headerConfig, handle: 'profileEdit' })
)

export default enhance(ProfileEdit)
