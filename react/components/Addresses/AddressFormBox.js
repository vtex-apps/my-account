import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import AddressShape from '@vtex/address-form/lib/propTypes/AddressShape'
import ContentBox from '../shared/ContentBox'
import emptyAddress from './emptyAddress'
import AddressEditor from './AddressEditor'
import AddressDeletter from './AddressDeletter'
import CreateAddress from '../../graphql/CreateAddress.gql'
import UpdateAddress from '../../graphql/UpdateAddress.gql'

class AddressFormBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: null,
    }
  }

  componentDidMount() {
    const baseAddress = this.props.isNew ? emptyAddress : this.props.address
    const { __typename, ...address } = baseAddress
    this.setState({ address })
  }

  reshapeAddress(address) {
    const { addressId, addressQuery, geoCoordinates, ...reshapedAddr } = address
    return {
      ...reshapedAddr,
      geoCoordinate: address.geoCoordinates,
      addressName: this.generateRandomName(),
    }
  }

  generateRandomName() {
    return (1 + Math.random()).toString(36).substring(2)
  }

  handleSubmit = (valid, address) => {
    if (!valid) return

    const { createAddress, updateAddress, isNew, onAddressSaved } = this.props
    const { addressId } = address
    const addressFields = this.reshapeAddress(address)

    console.log(addressFields)

    if (isNew) {
      createAddress({ addressFields }).then(addresses =>
        onAddressSaved(addresses),
      )
    } else {
      updateAddress({ addressId, addressFields }).then(addresses =>
        onAddressSaved(addresses),
      )
    }
  }

  render() {
    const { onAddressDeleted, isNew } = this.props
    const { address } = this.state

    if (!address) return null

    return (
      <ContentBox width={'third'}>
        <AddressEditor
          address={address}
          isNew={isNew}
          onSubmit={this.handleSubmit}
        />
        {!isNew && (
          <AddressDeletter
            addressId={address.addressId}
            onAddressDeleted={onAddressDeleted}
          />
        )}
      </ContentBox>
    )
  }
}

AddressFormBox.propTypes = {
  isNew: PropTypes.bool,
  onAddressDeleted: PropTypes.func,
  createAddress: PropTypes.object.isRequired,
  updateAddress: PropTypes.object.isRequired,
  onAddressSaved: PropTypes.func.isRequired,
  address: AddressShape,
}

const createAddressMutation = {
  name: 'createAddress',
  options({ addressFields }) {
    return {
      variables: { addressFields },
    }
  },
}
const updateAddressMutation = {
  name: 'updateAddress',
  options({ addressId, addressFields }) {
    return {
      variables: { addressId, addressFields },
    }
  },
}
const enhance = compose(
  graphql(UpdateAddress, updateAddressMutation),
  graphql(CreateAddress, createAddressMutation),
)
export default enhance(AddressFormBox)
