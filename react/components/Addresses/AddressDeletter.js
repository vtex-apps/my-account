import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Button } from 'vtex.styleguide'
import DeleteAddress from '../../graphql/DeleteAddress.gql'

class AddressDeletter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleting: false,
    }
  }

  onDeleteClick = () => {
    if (this.state.isDeleting) return

    this.setState({
      isDeleting: true,
    })
    this.props
      .deleteAddress({
        variables: {
          addressId: this.props.addressId,
        },
      })
      .then(this.props.onAddressDeleted)
  }

  render() {
    const { intl } = this.props
    const { isDeleting } = this.state
    return (
      <div className="mt5">
        <Button
          type="button"
          variation="danger"
          block
          size="small"
          onClick={this.onDeleteClick}
          isLoading={isDeleting}
        >
          {intl.formatMessage({ id: 'addresses.deleteAddress' })}
        </Button>
      </div>
    )
  }
}

AddressDeletter.propTypes = {
  onAddressDeleted: PropTypes.func.isRequired,
  addressId: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
}

const deleteAddressMutation = {
  name: 'deleteAddress',
  options({ addressId }) {
    return {
      variables: { addressId },
    }
  },
}
const enhance = compose(
  graphql(DeleteAddress, deleteAddressMutation),
  injectIntl,
)
export default enhance(AddressDeletter)
