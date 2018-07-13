import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import Button from '@vtex/styleguide/lib/Button'
import Header from '../components/shared/Header'
import AddressBox from '../components/Addresses/AddressBox'
import DefaultAddressBox from '../components/Addresses/DefaultAddressBox'
import EditingAddressBox from '../components/Addresses/EditingAddressBox'
import Loading from '../pages/Loading'
import GetAddresses from '../graphql/GetAddresses.gql'

class Addresses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingNew: false,
      rules: {},
      numCountries: 0,
    }
  }

  componentDidMount() {
    const { addresses } = this.props.addressesQuery
    const countryCodes = new Set()
    addresses.forEach(address => countryCodes.add(address.country))
    this.setState(prevState => ({
      numCountries: countryCodes.size,
    }))
    this.fetchCountryRules(countryCodes)
  }

  fetchCountryRules = countryCodes => {
    for (let country of countryCodes) {
      import('@vtex/address-form/lib/country/' + country).then(rules => {
        this.setState(prevState => ({
          rules: { ...prevState.rules, [country]: rules },
        }))
      })
    }
  }

  startAddingNew = () => {
    this.setState({
      isAddingNew: true,
    })
  }

  startEditing = index => {
    const { addresses } = this.state
    addresses[index].isEditing = true
    this.setState({
      addresses: addresses,
    })
  }

  makeDefault = index => {
    const { addresses } = this.state
    addresses.map(address => (address.isDefault = false))
    addresses[index].isDefault = true
    this.setState({
      addresses: addresses,
    })
  }

  render() {
    const { intl, addressesQuery } = this.props
    const { addresses } = addressesQuery
    const { isAddingNew, rules, numCountries } = this.state
    const numRules = Object.keys(rules).length
    if (numRules === 0 || numRules != numCountries) return <Loading />
    const pageTitle = intl.formatMessage({ id: 'pages.addresses' })

    const addressBoxes = addresses.map((address, index) => {
      if (address.isEditing) return <EditingAddressBox key={index} />
      else if (address.isDefault)
        return (
          <DefaultAddressBox
            key={index}
            onEditClick={() => this.startEditing(index)}
          />
        )
      else
        return (
          <AddressBox
            key={index}
            address={address}
            rules={rules['USA']}
            onEditClick={() => this.startEditing(index)}
            onDefaultClick={() => this.makeDefault(index)}
          />
        )
    })

    return (
      <section>
        <div className="flex flex-column flex-row-ns items-center-ns justify-between-ns">
          <Header title={pageTitle} />
          <div className="mt6 mt5-ns mr5-ns">
            <Button
              variation="primary"
              block
              size="small"
              onClick={this.startAddingNew}
            >
              {intl.formatMessage({ id: 'addresses.addAddress' })}
            </Button>
          </div>
        </div>
        <main className="mt6 flex-ns flex-wrap-ns items-start-ns">
          {isAddingNew && <EditingAddressBox isNew={true} />}
          {addressBoxes}
        </main>
      </section>
    )
  }
}

Addresses.propTypes = {
  intl: intlShape.isRequired,
  addressesQuery: PropTypes.any,
}

const enhance = compose(
  graphql(GetAddresses, { name: 'addressesQuery' }),
  branch(
    ({ addressesQuery }) => addressesQuery.loading,
    renderComponent(Loading),
  ),
  injectIntl,
)
export default enhance(Addresses)
