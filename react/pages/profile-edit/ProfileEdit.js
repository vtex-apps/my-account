import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import ProfileEditHeader from './ProfileEditHeader'
import ProfileEditLoading from './ProfileEditLoading'
import GenericError from '../../components/shared/GenericError'
import ProfileFormBox from '../../components/Profile/ProfileFormBox'
import GetProfile from '../../graphql/getProfile.gql'

class ProfileEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldShowError: false,
    }
  }

  goBack = () => {
    this.props.history.push('/profile?success=true')
  }

  handleError = () => {
    this.setState({ shouldShowError: true })
  }

  dismissError = () => {
    this.setState({ shouldShowError: false })
  }

  render() {
    const { profile } = this.props
    const { shouldShowError } = this.state

    return (
      <section className="pa6 pv0-m-2 pl0-m-2 pr5-m pr8-l">
        <ProfileEditHeader />
        <main className="mt6">
          {shouldShowError && (
            <GenericError
              onDismiss={this.dismissError}
              errorId="alert.unknownError"
            />
          )}
          <ProfileFormBox
            profile={profile}
            onDataSave={this.goBack}
            onError={this.handleError}
          />
        </main>
      </section>
    )
  }
}

ProfileEdit.propTypes = {
  profile: PropTypes.object.isRequired,
}

const enhance = compose(
  graphql(GetProfile),
  branch(
    ({ data }) => data.profile == null,
    renderComponent(ProfileEditLoading),
  ),
  withProps(({ data }) => ({ profile: data.profile })),
  withRouter,
)
export default enhance(ProfileEdit)
