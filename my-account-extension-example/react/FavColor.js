import React, { Component } from 'react'
import { Input } from 'vtex.styleguide'

class FavColor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: '',
      error: null,
    }
  }

  componentDidMount() {
    this.props.registerValidator(this.validate)
    this.props.registerSubmitter(this.submit)
  }

  onChange = e => {
    this.setState({ color: e.target.value })
  }

  validate = () => {
    const { color } = this.state
    this.setState({ error: null })
    if (color !== 'yellow') {
      this.setState({ error: 'Your favorite color must be yellow.' })
      return false
    }
    return true
  }

  submit = () => {
    console.log('Success! Your information is saved.')
  }

  render() {
    const { error, color } = this.state
    return (
      <div className="mb8">
        <Input
          name="color"
          label="Favorite Color"
          value={color}
          errorMessage={error}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default FavColor
