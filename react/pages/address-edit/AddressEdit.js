import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import AddressEditHeader from './AddressEditHeader'
import ErrorAlert from '../../components/shared/ErrorAlert'
import AddressFormBox from '../../components/Addresses/AddressFormBox'
import GetName from '../../graphql/getName.gql'
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
    const { profile, addresses, addressId } = this.props
    const { shouldShowError } = this.state
    const address = addresses.find(current => current.addressId === addressId)

    if (!address) return null

    return (
      <section>
        <AddressEditHeader />
        <main className="mt6">
          {shouldShowError && (
            <div className="mb6 mw6 pr5-ns">
              <ErrorAlert onDismiss={this.dismissError} />
            </div>
          )}
          <AddressFormBox
            address={address}
            profile={profile}
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
  profile: PropTypes.object.isRequired,
  addresses: PropTypes.array.isRequired,
  addressId: PropTypes.string.isRequired,
}

const enhance = compose(
  graphql(GetAddresses, { name: 'addressQ' }),
  graphql(GetName, { name: 'nameQ' }),
  branch(
    ({ addressQ, nameQ }) => addressQ.loading || nameQ.loading,
    renderComponent(AddressEditHeader),
  ),
  withProps(({ addressQ, nameQ, match }) => ({
    profile: nameQ.profile,
    addresses: addressQ.profile.addresses,
    addressId: match.params.id,
  })),
)
export default enhance(AddressEdit)
