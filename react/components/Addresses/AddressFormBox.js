import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import AddressShape from '@vtex/address-form/lib/propTypes/AddressShape'
import ContentBox from '../shared/ContentBox'
import emptyAddress from './emptyAddress'
import AddressEditor from './AddressEditor'
import AddressDeletter from './AddressDeletter'
import CreateAddress from '../../graphql/createAddress.gql'
import UpdateAddress from '../../graphql/updateAddress.gql'

class AddressFormBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  prepareAddress(address) {
    const { profile } = this.props
    const defaultReceiver = profile.firstName + ' ' + profile.lastName

    const { __typename, ...addr } = address
    return {
      ...addr,
      addressQuery: null,
      receiverName: addr.receiverName || defaultReceiver,
    }
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

  handleSubmit = async (valid, address) => {
    if (!valid || this.state.isLoading) return

    const {
      createAddress,
      updateAddress,
      isNew,
      onAddressSaved,
      onError,
    } = this.props
    const { addressId } = address
    const addressFields = this.reshapeAddress(address)

    try {
      this.setState({ isLoading: true })
      isNew
        ? await createAddress({ variables: { addressFields } })
        : await updateAddress({ variables: { addressId, addressFields } })
      this.setState({ isLoading: false })
      onAddressSaved()
    } catch (error) {
      onError()
    }
  }

  render() {
    const { onAddressDeleted, isNew, onError } = this.props
    const { isLoading } = this.state
    const baseAddress = isNew ? emptyAddress : this.props.address

    if (!baseAddress) return null

    const address = this.prepareAddress(baseAddress)

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        <AddressEditor
          address={address}
          isNew={isNew}
          isLoading={isLoading}
          onSubmit={this.handleSubmit}
        />
        {!isNew && (
          <AddressDeletter
            addressId={address.addressId}
            onAddressDeleted={onAddressDeleted}
            onError={onError}
          />
        )}
      </ContentBox>
    )
  }
}

AddressFormBox.defaultProps = {
  isNew: false,
}

AddressFormBox.propTypes = {
  isNew: PropTypes.bool.isRequired,
  onAddressDeleted: PropTypes.func,
  createAddress: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
  onAddressSaved: PropTypes.func.isRequired,
  onError: PropTypes.func,
  address: AddressShape,
  profile: PropTypes.object,
}

const enhance = compose(
  graphql(UpdateAddress, { name: 'updateAddress' }),
  graphql(CreateAddress, { name: 'createAddress' }),
)
export default enhance(AddressFormBox)
