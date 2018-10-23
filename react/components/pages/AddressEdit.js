import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'

import GenericError from '../shared/GenericError'
import AddressEditHeader from '../headers/AddressEditHeader'
import AddressEditLoading from '../loaders/AddressEditLoading'
import AddressFormBox from '../Addresses/AddressFormBox'
import PageTemplate from '../shared/PageTemplate'
import GET_ADDRESS from '../../graphql/getAddresses.gql'

class AddressEdit extends Component {
  goBack = () => {
    this.props.history.push('/addresses?success=true')
  }

  render() {
    const { addresses, addressId, shipsTo } = this.props
    const address = addresses.find(current => current.addressId === addressId)

    return (
      <PageTemplate
        header={<AddressEditHeader />}
      >
        {onError => (
          <Fragment>
            {address ? (
              <AddressFormBox
                address={address}
                onAddressSaved={this.goBack}
                onAddressDeleted={this.goBack}
                onError={onError}
                shipsTo={shipsTo}
              />
            ) : (
              <GenericError errorId="alert.addressNotFound" />
            )}
          </Fragment>
        )}
      </PageTemplate>
    )
  }
}

AddressEdit.propTypes = {
  addresses: PropTypes.array.isRequired,
  addressId: PropTypes.string.isRequired,
  shipsTo: PropTypes.array.isRequired,
}

const enhance = compose(
  graphql(GET_ADDRESS),
  branch(
    ({ data }) => data.profile == null,
    renderComponent(AddressEditLoading),
  ),
  withProps(({ data, match }) => ({
    addresses: data.profile.addresses,
    addressId: match.params.id,
    shipsTo: data.logistics.shipsTo,
  })),
)
export default enhance(AddressEdit)
