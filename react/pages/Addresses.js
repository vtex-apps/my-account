import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import Button from '@vtex/styleguide/lib/Button'
import Header from '../components/shared/Header'
import AddressBox from '../components/Addresses/AddressBox'
import EditingAddressBox from '../components/Addresses/EditingAddressBox'
import Loading from '../pages/Loading'
import GetAddresses from '../graphql/GetAddresses.gql'

class Addresses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddingNew: false,
      editingIndex: null,
      addresses: [],
    }
  }

  componentDidMount() {
    const {
      profile: { addresses },
    } = this.props.addressesQuery

    this.setState({
      addresses: [...addresses],
    })
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

  render() {
    const { intl } = this.props
    const { isAddingNew, editingIndex, addresses } = this.state

    const pageTitle = intl.formatMessage({ id: 'pages.addresses' })

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
              disabled={isAddingNew}
            >
              {intl.formatMessage({ id: 'addresses.addAddress' })}
            </Button>
          </div>
        </div>
        <main className="mt6 flex-ns flex-wrap-ns items-start-ns">
          {isAddingNew && <EditingAddressBox isNew={true} />}
          {addresses.map(
            (address, index) =>
              editingIndex === index ? (
                <EditingAddressBox address={address} key={index} />
              ) : (
                <AddressBox
                  key={index}
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
