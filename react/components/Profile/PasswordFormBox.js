import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import ContentBox from '../shared/ContentBox'
import { Input, Button } from 'vtex.styleguide'

class PasswordFormBox extends Component {
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
    // validation and submission logic goes here
    this.props.onPasswordChange()
  }

  render() {
    const { intl } = this.props
    const { newPassword, confirmPassword } = this.state
    return (
      <ContentBox shouldAllowGrowing>
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

PasswordFormBox.propTypes = {
  intl: intlShape.isRequired,
  onPasswordChange: PropTypes.func,
}

export default injectIntl(PasswordFormBox)
