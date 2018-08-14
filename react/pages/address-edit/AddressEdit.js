import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import AddressEditHeader from './AddressEditHeader'
import AddressEditLoading from './AddressEditLoading'
import ErrorAlert from '../../components/shared/ErrorAlert'
import AddressFormBox from '../../components/Addresses/AddressFormBox'
import GetAddresses from '../../graphql/getAddresses.gql'

class AddressEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldShowError: false,
    }
  }

  goBack = () => {
    this.props.history.push('/addresses')
  }

  handleError = () => {
    this.setState({ shouldShowError: true })
  }

  dismissError = () => {
    this.setState({ shouldShowError: false })
  }

  render() {
    const { addresses, addressId } = this.props
    const { shouldShowError } = this.state
    const address = addresses.find(current => current.addressId === addressId)

    if (!address) return <ErrorAlert errorId="error.addressNotFound" />

    return (
      <section>
        <AddressEditHeader />
        <main className="mt6">
          {shouldShowError && (
            <ErrorAlert
              onDismiss={this.dismissError}
              errorId="error.unknownError"
            />
          )}
          <AddressFormBox
            address={address}
            onAddressSaved={this.goBack}
            onAddressDeleted={this.goBack}
            onError={this.handleError}
          />
        </main>
      </section>
    )
  }
}

AddressEdit.propTypes = {
  addresses: PropTypes.array.isRequired,
  addressId: PropTypes.string.isRequired,
}

const enhance = compose(
  graphql(GetAddresses),
  branch(
    ({ data }) => data.profile == null,
    renderComponent(AddressEditLoading),
  ),
  withProps(({ data, match }) => ({
    addresses: data.profile.addresses,
    addressId: match.params.id,
  })),
)
export default enhance(AddressEdit)
