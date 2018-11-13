import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { ContentWrapper, GenericError } from 'vtex.my-account-commons'

import AddressEditLoading from '../loaders/AddressEditLoading'
import AddressFormBox from '../Addresses/AddressFormBox'
import GET_ADDRESS from '../../graphql/getAddresses.gql'

export const headerConfig = () => {
  return {
    titleId: 'pages.addressEdit',
    backButton: {
      titleId: 'pages.addresses',
      path: '/addresses',
    }
  }
}

class AddressEdit extends Component {
  handleGoBack = () => {
    this.props.history.push('/addresses?success=true')
  }

  render() {
    const { addresses, addressId, shipsTo } = this.props
    const address = addresses.find(current => current.addressId === addressId)

    return (
      <ContentWrapper {...headerConfig()}>
        {onError => (
          <Fragment>
            {address ? (
              <AddressFormBox
                address={address}
                onAddressSaved={this.handleGoBack}
                onAddressDeleted={this.handleGoBack}
                onError={onError}
                shipsTo={shipsTo}
              />
            ) : (
                <GenericError errorId="alert.addressNotFound" />
              )}
          </Fragment>
        )}
      </ContentWrapper>
    )
  }
}

AddressEdit.propTypes = {
  history: PropTypes.object.isRequired,
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
