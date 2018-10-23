import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { Button } from 'vtex.styleguide'
import DeleteAddress from '../../graphql/deleteAddress.gql'

class AddressDeleter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  onDeleteClick = async () => {
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

AddressDeleter.propTypes = {
  /** Mutation for deleting an address */
  deleteAddress: PropTypes.func.isRequired,
  /** Callback for address deletion */
  onAddressDeleted: PropTypes.func.isRequired,
  /** Callback for error during deletion */
  onError: PropTypes.func.isRequired,
  /** Id of the address to be deleted */
  addressId: PropTypes.string.isRequired,
  /** React-intl utility */
  intl: intlShape.isRequired,
}

const enhance = compose(
  graphql(DeleteAddress, { name: 'deleteAddress' }),
  injectIntl,
)
export default enhance(AddressDeleter)
