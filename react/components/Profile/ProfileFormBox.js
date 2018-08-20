import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Button } from 'vtex.styleguide'
import { ProfileRules, ProfileContainer } from 'vtex.profile-form'
import ContentBox from '../shared/ContentBox'
import UpdateProfile from '../../graphql/updateProfile.gql'

class ProfileFormBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
    this.extension = React.createRef()
  }

  handleSubmit = async ({ valid, profile: profileInput }) => {
    const { updateProfile, onDataSave, onError } = this.props
    const { email, ...profile } = profileInput
    if (!valid || this.state.isLoading) return

    if (this.extension.current && this.extension.current.submit) {
      const extensionValid = this.extension.current.submit()
      if (!extensionValid) return
    }

    try {
      this.setState({ isLoading: true })
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

    if (!profile) return null

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        <ProfileRules country={'BRA'} shouldUseIOFetching>
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
  onDataSave: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
}

const enhance = compose(
  graphql(UpdateProfile, { name: 'updateProfile' }),
  injectIntl,
)
export default enhance(ProfileFormBox)
