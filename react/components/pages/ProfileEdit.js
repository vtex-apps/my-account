import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { ContentWrapper } from 'vtex.my-account-commons'

import ProfileEditLoading from '../loaders/ProfileEditLoading'
import ProfileFormBox from '../Profile/ProfileFormBox'
import GET_PROFILE from '../../graphql/getProfile.gql'

export const headerConfig = () => {
  return {
    titleId: 'pages.profileEdit',
    backButton: {
      titleId: 'pages.profile',
      path: '/profile',
    },
  }
}

class ProfileEdit extends Component {
  handleGoBack = () => {
    this.props.history.push('/profile?success=true')
  }

  render() {
    const { profile } = this.props

    return (
      <ContentWrapper {...headerConfig()}>
        {onError => (
          <ProfileFormBox
            profile={profile}
            onDataSave={this.handleGoBack}
            onError={onError}
          />
        )}
      </ContentWrapper>
    )
  }
}

ProfileEdit.propTypes = {
  profile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const enhance = compose(
  graphql(GET_PROFILE),
  branch(
    ({ data }) => data.profile == null,
    renderComponent(ProfileEditLoading)
  ),
  withProps(({ data }) => ({ profile: data.profile })),
  withRouter
)
export default enhance(ProfileEdit)
