import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import AddressShape from '@vtex/address-form/lib/propTypes/AddressShape'
import ContentBox from '../shared/ContentBox'
import emptyAddress from './emptyAddress'
import AddressEditor from './AddressEditor'
import AddressDeletter from './AddressDeletter'
import CREATE_ADDRESS from '../../graphql/createAddress.gql'
import UPDATE_ADDRESS from '../../graphql/updateAddress.gql'

const generateRandomName = () => {
  return (1 + Math.random()).toString(36).substring(2)
}

class AddressFormBox extends Component {
  state = {
    isLoading: false,
  }

  prepareAddress = (address) => {
    const { profile } = this.props
  
    let defaultReceiver
    if(profile) {
      defaultReceiver = profile.firstName || ''

      if(profile.lastName)
        defaultReceiver += ` ${profile.lastName}` 
    }

    const { __typename, ...addr } = address
    return {
      ...addr,
      addressQuery: null,
      receiverName: addr.receiverName || defaultReceiver,
    }
  }

  reshapeAddress = (address) => {
    const { addressId, addressQuery, geoCoordinates, ...reshapedAddr } = address
    return {
      ...reshapedAddr,
      geoCoordinate: address.geoCoordinates,
      addressName: generateRandomName(),
    }
  }

  handleSubmit = (valid, address) => {
    if (!valid) return

    const {
      createAddress,
      updateAddress,
      isNew,
      onAddressSaved,
      onError,
    } = this.props
    const { addressId } = address
    const addressFields = this.reshapeAddress(address)

    this.setState({ isLoading: true })

    const promise = isNew ? 
      createAddress({ variables: { addressFields } })
      : updateAddress({ variables: { addressId, addressFields } })
    
    promise.then(() => {
      this.setState({ isLoading: false })
      onAddressSaved()
    }).catch( () => {
      this.setState({ isLoading: false})
      onError()
    })
  }

  render() {
    const { onAddressDeleted, isNew, shipsTo, onError } = this.props
    const baseAddress = isNew ? emptyAddress : this.props.address

    if (!baseAddress) return null

    const address = this.prepareAddress(baseAddress)

    const isLoading = false

    return (
      <ContentBox shouldAllowGrowing maxWidthStep={6}>
        <AddressEditor
          address={address}
          isNew={isNew}
          isLoading={isLoading}
          onSubmit={this.handleSubmit}
          shipsTo={shipsTo}
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
  shipsTo: PropTypes.array.isRequired,
}

const enhance = compose(
  graphql(UPDATE_ADDRESS, { name: 'updateAddress' }),
  graphql(CREATE_ADDRESS, { name: 'createAddress' }),
)
export default enhance(AddressFormBox)
