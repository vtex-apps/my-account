import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { Button } from 'vtex.styleguide'
import DeleteAddress from '../../graphql/deleteAddress.gql'

class AddressDeletter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  onDeleteClick = () => {
    const { addressId } = this.props
    if (this.state.isLoading) return

    this.setState({
      isLoading: true,
    })
    this.props
      .deleteAddress({ variables: { addressId } })
      .then(this.props.onAddressDeleted)
  }

  render() {
    const { intl } = this.props
    const { isLoading } = this.state
    return (
      <div className="mt5">
        <Button
          type="button"
          variation="danger"
          block
          size="small"
          onClick={this.onDeleteClick}
          isLoading={isLoading}
        >
          {intl.formatMessage({ id: 'addresses.deleteAddress' })}
        </Button>
      </div>
    )
  }
}

AddressDeletter.propTypes = {
  deleteAddress: PropTypes.func.isRequired,
  onAddressDeleted: PropTypes.func.isRequired,
  addressId: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(DeleteAddress, { name: 'deleteAddress' }),
  injectIntl,
)
export default enhance(AddressDeletter)
