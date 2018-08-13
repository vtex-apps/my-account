import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { Button } from 'vtex.styleguide'
import Header from '../components/shared/Header'
import AddressBox from '../components/Addresses/AddressBox'
import AddressFormBox from '../components/Addresses/AddressFormBox'
import Loading from '../pages/Loading'
import GetAddresses from '../graphql/getAddresses.gql'
import GetName from '../graphql/getName.gql'

class Addresses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingNew: false,
      editingIndex: null,
    }
  }

  startAddingNew = () => {
    this.setState({
      isAddingNew: true,
      editingIndex: null,
    })
  }

  startEditing = index => {
    this.setState({
      editingIndex: index,
      isAddingNew: false,
    })
  }

  handleAddressDeleted = () => {
    this.setState({ editingIndex: null })
  }

  handleAddressSaved = () => {
    this.setState({
      editingIndex: null,
      isAddingNew: false,
    })
  }

  render() {
    const { intl, addresses, profile } = this.props
    const { isAddingNew, editingIndex } = this.state

    const pageTitle = intl.formatMessage({ id: 'pages.addresses' })

    return (
      <section>
        <div className="flex flex-column flex-row-ns flex-wrap items-center-ns justify-between-ns">
          <Header title={pageTitle} />
          <div className="mt6 mt5-ns mr5-ns flex-none">
            <Button
              variation="primary"
              block
              size="small"
              onClick={this.startAddingNew}
              disabled={isAddingNew}
            >
              {intl.formatMessage({ id: 'addresses.addAddress' })}
            </Button>
          </div>
        </div>
        <main className="mt7 flex-ns flex-wrap-ns items-start-ns">
          {isAddingNew && (
            <AddressFormBox isNew onAddressSaved={this.handleAddressSaved} />
          )}
          {addresses.map(
            (address, index) =>
              editingIndex === index ? (
                <AddressFormBox
                  isNew={false}
                  address={address}
                  profile={profile}
                  onAddressSaved={this.handleAddressSaved}
                  onAddressDeleted={this.handleAddressDeleted}
                  key={address.addressId}
                />
              ) : (
                <AddressBox
                  key={address.addressId}
                  address={address}
                  onEditClick={() => this.startEditing(index)}
                />
              ),
          )}
        </main>
      </section>
    )
  }
}

Addresses.propTypes = {
  intl: intlShape.isRequired,
  addresses: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
}

const enhance = compose(
  graphql(GetAddresses),
  graphql(GetName, { name: 'nameQuery' }),
  branch(
    ({ data, nameQuery }) => data.loading || nameQuery.loading,
    renderComponent(Loading),
  ),
  withProps(({ data, nameQuery }) => ({
    profile: nameQuery.profile,
    addresses: data.profile.addresses,
  })),
  injectIntl,
)
export default enhance(Addresses)
