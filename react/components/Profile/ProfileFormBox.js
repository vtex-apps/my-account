import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'
import { ProfileRules, ProfileContainer } from 'vtex.profile-form'
import ContentBox from '../shared/ContentBox'
import UpdateProfile from '../../graphql/updateProfile.gql'
import { withStoreCountry } from '../shared/withStoreCountry'
import { withSettings } from '../shared/withSettings'

class ProfileFormBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
    this.validatorFunctions = []
    this.submitterFunctions = []
  }

  componentDidMount() {
    this.registerValidator(this.validate)
    this.registerSubmitter(this.submit)
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve)
    })
  }

  registerValidator = validator => {
    this.validatorFunctions.push(validator)
  }

  registerSubmitter = submitter => {
    this.submitterFunctions.push(submitter)
  }

  handleSubmit = async ({ valid, profile }) => {
    const { onDataSave, onError } = this.props
    await this.setStateAsync({ isLoading: true, valid, profile })
    try {
      const validation$ = this.validatorFunctions.map(validator => validator())
      const validationResults = await Promise.all(validation$)
      const isValid = validationResults.reduce((acc, cur) => acc && cur, true)

      if (!isValid) {
        this.setState({ isLoading: false })
        return
      }

      const submit$ = this.submitterFunctions.map(submitter => submitter(profile))
      await Promise.all(submit$)
      this.setState({ isLoading: false })
      onDataSave()
    } catch (error) {
      onError(error)
    }
  }

  validate = () => {
    return this.state.valid
  }

  submit = (profile) => {
    const { updateProfile } = this.props
    return updateProfile({ variables: { profile } })
  }

  render() {
    const { intl, profile, settings, storeCountry } = this.props
    const { isLoading } = this.state
    const showGenders =
      settings && settings.profile && settings.profile.showGenders

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
            }>
            <ExtensionPoint
              id="profile-input"
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
  storeCountry: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  onDataSave: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
}

const enhance = compose(
  graphql(UpdateProfile, { name: 'updateProfile' }),
  injectIntl,
  withStoreCountry,
  withSettings
)
export default enhance(ProfileFormBox)
