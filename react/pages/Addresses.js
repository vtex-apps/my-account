import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { Button } from 'vtex.styleguide'
import Header from '../components/shared/Header'
import AddressBox from '../components/Addresses/AddressBox'
import Loading from '../pages/Loading'
import GetAddresses from '../graphql/getAddresses.gql'
import ConnectionError from '../components/shared/ConnectionError'

class Addresses extends Component {
  startEditing = address => {
    this.props.history.push('/addresses/edit/' + address.addressId)
  }

  render() {
    const { intl, addresses, error } = this.props

    return (
      <section>
        <div className="flex flex-column flex-row-ns flex-wrap items-center-ns justify-between-ns">
          <Header titleId={'pages.addresses'} />
          {!error && (
            <div className="mt6 mt5-ns mr5-ns flex-none">
              <Link to="/addresses/new">
                <Button variation="primary" block size="small">
                  {intl.formatMessage({ id: 'addresses.addAddress' })}
                </Button>
              </Link>
            </div>
          )}
        </div>
        {error ? (
          <ConnectionError />
        ) : (
          <main className="mt7 flex-ns flex-wrap-ns items-start-ns">
            {addresses.map(address => (
              <AddressBox
                key={address.addressId}
                address={address}
                onEditClick={() => this.startEditing(address)}
              />
            ))}
          </main>
        )}
      </section>
    )
  }
}

Addresses.propTypes = {
  intl: intlShape.isRequired,
  addresses: PropTypes.array.isRequired,
}

const enhance = compose(
  graphql(GetAddresses),
  branch(({ data }) => data.loading, renderComponent(Loading)),
  withProps(({ data }) => ({
    addresses: data.profile && data.profile.addresses,
    error: data.error,
  })),
  injectIntl,
  withRouter,
)
export default enhance(Addresses)
