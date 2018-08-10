import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import Loading from '../pages/Loading'
import Header from '../components/shared/Header'
import ProfileBox from '../components/Profile/ProfileBox'
import PasswordBox from '../components/Profile/PasswordBox'
import PasswordFormBox from '../components/Profile/PasswordFormBox'
import ProfileFormBox from '../components/Profile/ProfileFormBox'
import GetProfile from '../graphql/getProfile.gql'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingData: false,
      isEditingPassword: false,
    }
  }

  toggleEditingData = () => {
    this.setState(prevState => ({ isEditingData: !prevState.isEditingData }))
  }

  toggleEditingPassword = () => {
    this.setState(prevState => ({
      isEditingPassword: !prevState.isEditingPassword,
    }))
  }

  render() {
    const { intl, profileQuery } = this.props
    const { profile } = profileQuery
    const { isEditingData, isEditingPassword } = this.state
    const pageTitle = intl.formatMessage({ id: 'pages.profile' })

    return (
      <section>
        <Header title={pageTitle} />
        <main className="mt6 flex-ns flex-wrap items-start-ns">
          {isEditingData ? (
            <ProfileFormBox
              profile={profile}
              onDataSave={this.toggleEditingData}
            />
          ) : (
            <ProfileBox
              profile={profile}
              onEditClick={this.toggleEditingData}
            />
          )}
          {isEditingPassword ? (
            <PasswordFormBox onPasswordChange={this.toggleEditingPassword} />
          ) : (
            <PasswordBox onEditClick={this.toggleEditingPassword} />
          )}
        </main>
      </section>
    )
  }
}

Profile.propTypes = {
  profileQuery: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(GetProfile, { name: 'profileQuery' }),
  branch(({ profileQuery }) => profileQuery.loading, renderComponent(Loading)),
  injectIntl,
)
export default enhance(Profile)
