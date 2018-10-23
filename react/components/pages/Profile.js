import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'

import ProfileHeader from '../headers/ProfileHeader'
import ProfileLoading from '../loaders/ProfileLoading'
import ProfileBox from '../Profile/ProfileBox'
import PasswordBox from '../Profile/PasswordBox'
import PasswordFormBox from '../Profile/PasswordFormBox'
import Toast from '../shared/Toast'
import PageTemplate from '../shared/PageTemplate'
import GET_PROFILE from '../../graphql/getProfile.gql'

class Profile extends Component {
  state = {
    isEditingPassword: false,
    showToast: false,
  }

  componentDidMount = () => {
    const { location } = this.props
    this.setState({ showToast: location.search.indexOf('success=true') > -1 })
  }

  handleCloseToast = () => {
    this.setState({ showToast: false })
  }

  goToEdit = () => {
    this.props.history.push('/profile/edit')
  }

  handleEditingPassword = () => {
    this.setState({ isEditingPassword: true })
  }

  handleFinishEditingPassword = () => {
    this.setState({ isEditingPassword: false, showToast: true })
  }

  render() {
    const { profile } = this.props
    const { isEditingPassword, showToast } = this.state

    return (
      <PageTemplate
        header={<ProfileHeader />}
      >
        {() => (
          <Fragment>
            <ProfileBox profile={profile} onEditClick={this.goToEdit} />
            {isEditingPassword ? (
              <PasswordFormBox
                email={profile.email}
                onPasswordChange={this.handleFinishEditingPassword}
              />
            ) : (
              <PasswordBox onEditClick={this.handleEditingPassword} />
            )}
            {showToast && (
              <Toast messageId="alert.success" onClose={this.handleCloseToast} />
            )}
          </Fragment>
        )}
      </PageTemplate>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
}

const enhance = compose(
  graphql(GET_PROFILE),
  branch(({ data }) => data.profile == null, renderComponent(ProfileLoading)),
  withProps(({ data }) => ({ profile: data.profile })),
  withRouter,
)
export default enhance(Profile)
