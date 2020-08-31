import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import { Button } from 'vtex.styleguide'
import className from '../../styles/ContentBox.css'
import MUTATION from '../../graphql/deleteAddress.gql'

class AddressDeleter extends Component<OutterProps & InnerProps> {
  public state = {
    isLoading: false,
  }

  private handleDeleteClick = async () => {
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

  public render() {
    const { isLoading } = this.state
    return (
      <div className={`mt5 ${className.deleteButton}`}>
        <Button
          type="button"
          variation="danger"
          block
          size="small"
          onClick={this.handleDeleteClick}
          isLoading={isLoading}
        >
          <FormattedMessage id="vtex.store-messages@0.x::addresses.deleteAddress" />
        </Button>
      </div>
    )
  }
}

interface OutterProps {
  /** Callback for address deletion */
  onAddressDeleted: () => void
  /** Callback for error during deletion */
  onError: () => void
  /** Id of the address to be deleted */
  addressId: string
}

interface InnerProps {
  /** Mutation for deleting an address */
  deleteAddress: (args: Variables<DeleteAddressArgs>) => void
}

export default graphql<OutterProps, {}, {}, InnerProps>(MUTATION, {
  name: 'deleteAddress',
})(AddressDeleter)
