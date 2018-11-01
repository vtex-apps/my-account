import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'

import ProfileEditHeader from '../headers/ProfileEditHeader'
import ProfileEditLoading from '../loaders/ProfileEditLoading'
import ProfileFormBox from '../Profile/ProfileFormBox'
import PageTemplate from '../shared/PageTemplate'
import GET_PROFILE from '../../graphql/getProfile.gql'

class ProfileEdit extends Component {
  goBack = () => {
    this.props.history.push('/profile?success=true')
  }

  render() {
    const { profile } = this.props
    
    return (
      <PageTemplate 
        header={<ProfileEditHeader />}
      >
        {onError => (
          <ProfileFormBox
            profile={profile}
            onDataSave={this.goBack}
            onError={onError}
          />
        )}
      </PageTemplate>
    )
  }
}

ProfileEdit.propTypes = {
  profile: PropTypes.object.isRequired,
}

const enhance = compose(
  graphql(GET_PROFILE),
  branch(
    ({ data }) => data.profile == null,
    renderComponent(ProfileEditLoading),
  ),
  withProps(({ data }) => ({ profile: data.profile })),
  withRouter,
)
export default enhance(ProfileEdit)
