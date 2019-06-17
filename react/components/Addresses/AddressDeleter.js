import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import { Button } from 'vtex.styleguide'
import DeleteAddress from '../../graphql/deleteAddress.gql'

class AddressDeleter extends Component {
  state = {
    isLoading: false,
  }

  handleDeleteClick = async () => {
    const { addressId, onAddressDeleted, deleteAddress, onError } = this.props
    if (this.state.isLoading) return

    try {
      this.setState({ isLoading: true })
      await deleteAddress({ variables: { addressId } })
      onAddressDeleted()
    } catch (error) {
      this.setState({ isLoading: false })
      onError()
    }
  }

  render() {
    const { isLoading } = this.state
    return (
      <div className="mt5">
        <Button
          type="button"
          variation="danger"
          block
          size="small"
          onClick={this.handleDeleteClick}
          isLoading={isLoading}>
          <FormattedMessage id="addresses.deleteAddress" />
        </Button>
      </div>
    )
  }
}

AddressDeleter.propTypes = {
  /** Mutation for deleting an address */
  deleteAddress: PropTypes.func.isRequired,
  /** Callback for address deletion */
  onAddressDeleted: PropTypes.func.isRequired,
  /** Callback for error during deletion */
  onError: PropTypes.func.isRequired,
  /** Id of the address to be deleted */
  addressId: PropTypes.string.isRequired,
}

export default graphql(DeleteAddress, { name: 'deleteAddress' })(AddressDeleter)
