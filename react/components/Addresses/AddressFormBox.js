import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, renderNothing, branch } from 'recompose'
import AddressShape from '@vtex/address-form/lib/propTypes/AddressShape'
import ContentBox from '../shared/ContentBox'
import ErrorAlert from '../shared/ErrorAlert'
import emptyAddress from './emptyAddress'
import AddressEditor from './AddressEditor'
import AddressDeletter from './AddressDeletter'
import CreateAddress from '../../graphql/createAddress.gql'
import UpdateAddress from '../../graphql/updateAddress.gql'
import GetName from '../../graphql/getName.gql'

class AddressFormBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: null,
      isLoading: false,
      shouldShowError: false,
    }
  }

  prepareAddress(address) {
    const { profile } = this.props.nameQuery
    const defaultReceiver = profile.firstName + ' ' + profile.lastName

    const { __typename, ...addr } = address
    return {
      ...addr,
      addressQuery: null,
      receiverName: addr.receiverName || defaultReceiver,
    }
  }

  componentDidMount() {
    const baseAddress = this.props.isNew ? emptyAddress : this.props.address

    this.setState({
      address: this.prepareAddress(baseAddress),
    })
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

    const { createAddress, updateAddress, isNew, onAddressSaved } = this.props
    const { addressId } = address
    const addressFields = this.reshapeAddress(address)

    this.setState({
      isLoading: true,
      shouldShowError: false,
    })

    try {
      if (isNew) {
        const { data } = await createAddress({ variables: { addressFields } })
        onAddressSaved(data.createAddress.addresses)
      } else {
        const { data } = await updateAddress({
          variables: { addressId, addressFields },
        })
        onAddressSaved(data.updateAddress.addresses)
      }
    } catch (error) {
      this.showError()
    }
  }

  showError = () => {
    window.scroll(0, 0)
    this.setState({
      isLoading: false,
      shouldShowError: true,
    })
  }

  dismissError = () => {
    this.setState({
      shouldShowError: false,
    })
  }

  render() {
    const { onAddressDeleted, isNew } = this.props
    const { address, isLoading, shouldShowError } = this.state

    if (!address) return null

    return (
      <ContentBox shouldAllowGrowing>
        {shouldShowError && <ErrorAlert onDismiss={this.dismissError} />}
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
            onError={this.showError}
          />
        )}
      </ContentBox>
    )
  }
}

AddressFormBox.propTypes = {
  isNew: PropTypes.bool.isRequired,
  onAddressDeleted: PropTypes.func,
  nameQuery: PropTypes.object.isRequired,
  createAddress: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
  onAddressSaved: PropTypes.func.isRequired,
  address: AddressShape,
}

const enhance = compose(
  graphql(GetName, { name: 'nameQuery' }),
  branch(({ nameQuery }) => nameQuery.loading, renderNothing()),

  graphql(UpdateAddress, { name: 'updateAddress' }),
  graphql(CreateAddress, { name: 'createAddress' }),
)
export default enhance(AddressFormBox)
