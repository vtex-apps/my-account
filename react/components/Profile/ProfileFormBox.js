import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Input, Button } from 'vtex.styleguide'
import { ProfileRules, ProfileContainer } from '@vtex/profile-form'
import ContentBox from '../shared/ContentBox'
import emptyProfile from './emptyProfile'
import UpdateProfile from '../../graphql/updateProfile.gql'

class ProfileFormBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: emptyProfile,
      isLoading: false,
      shouldShowError: false,
    }
  }

  componentDidMount() {
    const { profile } = this.props
    this.setState({ profile })
  }

  handleChange = e => {
    e.persist()
    this.setState(prevState => ({
      profile: {
        ...prevState.profile,
        [e.target.name]: e.target.value,
      },
    }))
  }

  handleSubmit = e => {
    console.log('batendo aqui')
    console.log(e)

    return

    const { email, cacheId, ...profileInput } = this.state.profile
    const profile = {
      ...profileInput,
    }

    e.preventDefault()

    this.setState({ isLoading: true, shouldShowError: false })
    this.props
      .updateProfile({ variables: { profile } })
      .then(({ data: { updateProfile } }) => {
        this.props.onDataSave(updateProfile)
      })
      .catch(this.showError)
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
    const { intl } = this.props
    const { profile, isLoading, shouldShowError } = this.state

    if (!profile) return null

    return (
      <ContentBox shouldAllowGrowing>
        {shouldShowError && <ErrorAlert onDismiss={this.dismissError} />}

        <ProfileRules
          country={'BRA'}
          fetch={country => import('@vtex/profile-form/lib/rules/' + country)}
        >
          <ProfileContainer
            profile={profile}
            onSubmit={this.handleSubmit}
            shouldShowExtendedGenders={true}
            SubmitButton={
              <Button
                type="submit"
                variation="secondary"
                block
                size="small"
                isLoading={isLoading}
              >
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
