import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import Loading from '../pages/Loading'
import Header from '../components/shared/Header'
import ErrorAlert from '../components/shared/ErrorAlert'
import ProfileFormBox from '../components/Profile/ProfileFormBox'
import GetProfile from '../graphql/getProfile.gql'

class ProfileEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldShowError: true,
    }
  }
  goBack = () => {
    this.props.history.push('/profile')
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
      <section>
        <Header
          titleId={'pages.profileEdit'}
          backButtonId={'pages.profile'}
          backButtonPath={'/profile'}
          shouldAlwaysShowBackButton
        />
        <main className="mt6">
          {shouldShowError && (
            <div className="mb6 mw6 pr5-ns">
              <ErrorAlert onDismiss={this.dismissError} />
            </div>
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
  branch(({ data }) => data.loading, renderComponent(Loading)),
  withProps(({ data }) => ({ profile: data.profile })),
  withRouter,
)
export default enhance(ProfileEdit)
