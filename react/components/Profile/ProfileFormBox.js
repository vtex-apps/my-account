import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { ExtensionPoint } from 'render'
import { Button } from 'vtex.styleguide'
import { ProfileRules, ProfileContainer } from 'vtex.profile-form'
import ContentBox from '../shared/ContentBox'
import UpdateProfile from '../../graphql/updateProfile.gql'

class ProfileFormBox extends Component {
  static contextTypes = {
    getSettings: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
    this.validatorFunctions = []
    this.submitterFunctions = []
  }

  registerValidator = validator => {
    this.validatorFunctions.push(validator)
  }

  registerSubmitter = submitter => {
    this.submitterFunctions.push(submitter)
  }

  handleSubmit = async ({ valid, profile: profileInput }) => {
    const { updateProfile, onDataSave, onError } = this.props
    const { email, ...profile } = profileInput
    if (!valid || this.state.isLoading) return

    const passedAllValidators = this.validatorFunctions.reduce(
      (validationState, currentValidator) => {
        return validationState && currentValidator()
      },
      true,
    )
    if (!passedAllValidators) return

    try {
      this.setState({ isLoading: true })
      this.submitterFunctions.map(submitter => {
        submitter()
      })
      await updateProfile({ variables: { profile } })
      this.setState({ isLoading: false })
      onDataSave()
    } catch (error) {
      onError(error)
    }
  }

  render() {
    const { intl, profile } = this.props
    const { isLoading } = this.state
    const storeCountry = global.__RUNTIME__.culture.country

    const storeSettings = this.context.getSettings('vtex.my-account')
    const showGenders =
      storeSettings &&
      storeSettings.profile &&
      storeSettings.profile.showGenders

    if (!profile) return null

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        <ProfileRules country={storeCountry} shouldUseIOFetching>
          <ProfileContainer
            defaultProfile={profile}
            onSubmit={this.handleSubmit}
            shouldShowExtendedGenders={showGenders}
            SubmitButton={
              <Button type="submit" block size="small" isLoading={isLoading}>
                {intl.formatMessage({ id: 'profile-form.save-changes' })}
              </Button>
            }
          >
            <ExtensionPoint
              id="profile/input"
              registerValidator={this.registerValidator}
              registerSubmitter={this.registerSubmitter}
            />
          </ProfileContainer>
        </ProfileRules>
      </ContentBox>
    )
  }
}

ProfileFormBox.propTypes = {
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onDataSave: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
}

const enhance = compose(
  graphql(UpdateProfile, { name: 'updateProfile' }),
  injectIntl,
)
export default enhance(ProfileFormBox)
