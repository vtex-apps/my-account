import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Button } from 'vtex.styleguide'
import { ProfileRules, ProfileContainer } from '@vtex/profile-form'
import ContentBox from '../shared/ContentBox'
import ErrorAlert from '../shared/ErrorAlert'
import UpdateProfile from '../../graphql/updateProfile.gql'

class ProfileFormBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      shouldShowError: false,
    }
  }

  handleSubmit = async ({ valid, profile }) => {
    const { updateProfile, onDataSave } = this.props

    if (!valid) return

    try {
      this.setState({ isLoading: true, shouldShowError: false })
      const { data } = await updateProfile({
        variables: { profile: { ...profile, birthDate: '1996-09-10' } },
      })
      onDataSave(data.updateProfile)
    } catch (error) {
      this.showError()
    }
  }

  showError = () => {
    window.scroll(0, 0)

    this.setState({
      isLoading: false,
      shouldShowError: true,
    })
  }

  dismissError = () => {
    this.setState({
      shouldShowError: false,
    })
  }

  render() {
    const { intl, profile } = this.props
    const { isLoading, shouldShowError } = this.state

    if (!profile) return null

    return (
      <ContentBox shouldAllowGrowing>
        {shouldShowError && <ErrorAlert onDismiss={this.dismissError} />}

        <ProfileRules
          country={'BRA'}
          fetch={country => import('@vtex/profile-form/lib/rules/' + country)}
        >
          <ProfileContainer
            defaultProfile={profile}
            onSubmit={this.handleSubmit}
            shouldShowExtendedGenders={true}
            SubmitButton={
              <Button type="submit" block size="small" isLoading={isLoading}>
                {intl.formatMessage({ id: 'profile-form.save-changes' })}
              </Button>
            }
          />
        </ProfileRules>
      </ContentBox>
    )
  }
}

ProfileFormBox.propTypes = {
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onDataSave: PropTypes.func,
}

const enhance = compose(
  graphql(UpdateProfile, { name: 'updateProfile' }),
  injectIntl,
)
export default enhance(ProfileFormBox)
