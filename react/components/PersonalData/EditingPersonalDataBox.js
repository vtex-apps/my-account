import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import ContentBox from '../shared/ContentBox'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import emptyProfile from './emptyProfile'

class EditingPersonalDataBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: emptyProfile,
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
    const { profile } = this.state
    e.preventDefault()
    // validation and submission logic goes here
    console.log(profile)

    //this.props.onDataSave()
  }

  render() {
    const { intl } = this.props
    const { profile } = this.state

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
              name="email"
              value={profile.email || ''}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.email' })}
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
              name="mainPhone"
              value={profile.homePhone || ''}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.mainPhone' })}
            />
          </div>
          <Button type="submit" variation="secondary" block size="small">
            {intl.formatMessage({ id: 'personalData.saveData' })}
          </Button>
        </form>
      </ContentBox>
    )
  }
}

EditingPersonalDataBox.propTypes = {
  intl: intlShape.isRequired,
  onDataSave: PropTypes.func,
}

export default injectIntl(EditingPersonalDataBox)
