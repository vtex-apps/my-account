import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import Header from '../components/shared/Header'
import Button from '@vtex/styleguide/lib/Button'
import AddressBox from '../components/Addresses/AddressBox'
import DefaultAddressBox from '../components/Addresses/DefaultAddressBox'
import EditingAddressBox from '../components/Addresses/EditingAddressBox'

class Addresses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingNew: false,
      addresses: [
        { isEditing: false, isDefault: true },
        { isEditing: false, isDefault: false },
        { isEditing: false, isDefault: false },
      ],
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
    const { intl } = this.props
    const { addresses, isAddingNew } = this.state
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
}

export default injectIntl(Addresses)
