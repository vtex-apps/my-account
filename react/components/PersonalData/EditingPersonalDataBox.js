import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import ContentBox from '../shared/ContentBox'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class EditingPersonalDataBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      document: '',
      gender: '',
      birthDate: '',
      mainPhone: '',
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    // validation and submission logic goes here
    this.props.onDataSave()
  }

  render() {
    const { intl } = this.props
    const { name, email, document, gender, birthDate, mainPhone } = this.state
    return (
      <ContentBox width={'60'}>
        <form onSubmit={this.handleSubmit}>
          <div className="mb7">
            <Input
              name="name"
              value={name}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.name' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="email"
              value={email}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.email' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="document"
              value={document}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.document' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="gender"
              value={gender}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.gender' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="birthDate"
              value={birthDate}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'personalData.birthDate' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="mainPhone"
              value={mainPhone}
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
