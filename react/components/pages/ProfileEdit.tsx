import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { withRouter } from 'vtex.my-account-commons/Router'

import { withContentWrapper } from '../shared/withContentWrapper'
import ProfileEditLoading from '../loaders/ProfileEditLoading'
import ProfileFormBox from '../Profile/ProfileFormBox'
import GET_PROFILE from '../../graphql/getProfile.gql'

import styles from '../../styles.css'
import { defineMessages } from 'react-intl'

const messages = defineMessages({
  profileEdit: {
    id:'pages.profileEdit'
    from: 'vtex.store-messages',
  },
  profile: {
    id: 'pages.profile'
    from: 'vtex.store-messages',
  },
})

export const headerConfig = {
  namespace: `${styles.profileEdit}`,
  titleId: messages.profileEdit.id,
  backButton: {
    titleId: messages.profile.id,
    path: '/profile',
  },
}

class ProfileEdit extends Component<Props> {
  private handleGoBack = () => {
    this.props.history.push('/profile?success=true')
  }

  public render() {
    const { profile, handleError } = this.props

    return (
      <ProfileFormBox
        profile={profile}
        onDataSave={this.handleGoBack}
        onError={handleError}
      />
    )
  }
}

interface Props extends InjectedContentWrapperProps {
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
  withRouter,
  withContentWrapper(headerConfig)
)
export default enhance(ProfileEdit)
