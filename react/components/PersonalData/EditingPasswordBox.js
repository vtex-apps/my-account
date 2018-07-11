import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import ContentBox from '../shared/ContentBox'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class EditingPasswordBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPassword: '',
      confirmPassword: '',
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { newPassword, confirmPassword } = this.state
    // validation and submission logic goes here
    this.props.passwordChanged()
  }

  render() {
    const { intl } = this.props
    const { newPassword, confirmPassword } = this.state
    return (
      <ContentBox width={40}>
        <form onSubmit={this.handleSubmit}>
          <div className="mb7">
            <Input
              name="newPassword"
              value={newPassword}
              onChange={this.handleChange}
              type="password"
              label={intl.formatMessage({ id: 'personalData.newPassword' })}
            />
          </div>
          <div className="mb7">
            <Input
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
              type="password"
              label={intl.formatMessage({ id: 'personalData.confirmPassword' })}
            />
          </div>
          <Button type="submit" variation="secondary" block size="small">
            {intl.formatMessage({ id: 'personalData.savePassword' })}
          </Button>
        </form>
      </ContentBox>
    )
  }
}

EditingPasswordBox.propTypes = {
  intl: intlShape.isRequired,
  passwordChanged: PropTypes.func,
}

export default injectIntl(EditingPasswordBox)
