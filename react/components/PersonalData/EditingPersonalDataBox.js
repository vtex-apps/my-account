import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Input, Button } from 'vtex.styleguide'
import moment from 'moment'
import ContentBox from '../shared/ContentBox'
import emptyProfile from './emptyProfile'
import UpdateProfile from '../../graphql/UpdateProfile.gql'

class EditingPersonalDataBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: emptyProfile,
      isLoading: false,
    }
  }

  componentDidMount() {
    const { profile: profileData, intl } = this.props
    const profile = {
      ...profileData,
      birthDate: moment(profileData.birthDate).format('L'),
    }
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
    const { email, cacheId, ...profileInput } = this.state.profile
    const profile = {
      ...profileInput,
      birthDate: moment(profileInput.birthDate, 'L').format('YYYY-MM-DD'),
    }

    e.preventDefault()

    this.setState({ isLoading: true })
    this.props
      .updateProfile({ variables: { profile } })
      .then(({ data: { updateProfile } }) => {
        this.props.onDataSave(updateProfile)
      })
  }

  render() {
    const { intl } = this.props
    const { profile, isLoading } = this.state

    if (!profile) return null

    return (
      <ContentBox width={'60'}>
        <form onSubmit={this.handleSubmit}>
          <div className="mb7">
            <Input
              name="firstName"
              value={profile.firstName || ''}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.firstName' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="lastName"
              value={profile.lastName || ''}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.lastName' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="document"
              value={profile.document || ''}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.document' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="gender"
              value={profile.gender || ''}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.gender' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="birthDate"
              value={profile.birthDate || ''}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.birthDate' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="homePhone"
              value={profile.homePhone || ''}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.mainPhone' })}
            />
          </div>
          <Button
            type="submit"
            variation="secondary"
            block
            size="small"
            isLoading={isLoading}
          >
            {intl.formatMessage({ id: 'personalData.saveData' })}
          </Button>
        </form>
      </ContentBox>
    )
  }
}

EditingPersonalDataBox.propTypes = {
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  onDataSave: PropTypes.func,
}

const enhance = compose(
  graphql(UpdateProfile, { name: 'updateProfile' }),
  injectIntl,
)
export default enhance(EditingPersonalDataBox)
