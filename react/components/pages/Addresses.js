import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { EmptyState } from 'vtex.styleguide'

import AddressesHeader from '../headers/AddressesHeader'
import AddressesLoading from '../loaders/AddressesLoading'
import AddressBox from '../Addresses/AddressBox'
import Toast from '../shared/Toast'
import PageTemplate from '../shared/PageTemplate'

import GET_ADRESSES from '../../graphql/getAddresses.gql'

class Addresses extends Component {
  state = {
    showToast: false,
  }

  componentDidMount = () => {
    const { location } = this.props
    this.setState({ showToast: location.search.indexOf('success=true') > -1 })
  }

  handleCloseToast = () => {
    this.setState({ showToast: false })
  }

  startEditing = address => {
    this.props.history.push(`/addresses/edit/${address.addressId}`)
  }

  render() {
    const { addresses, intl } = this.props
    const { showToast } = this.state

    const emptyStateTitle = (
      <span className="c-on-base">
        {intl.formatMessage({ id: 'addresses.notFound'})}
      </span>
    )

    return (
      <PageTemplate 
        header={<AddressesHeader />}
      >
        {() => (
          <div className="flex-ns flex-wrap-ns items-start-ns relative tl">
            {addresses ? addresses.map(address => (
              <AddressBox
                key={address.addressId}
                address={address}
                onEditClick={() => this.startEditing(address)}
              />
            )) : (
              <EmptyState title={emptyStateTitle} />
            )}
            {showToast && <Toast messageId="alert.success" onClose={this.handleCloseToast} />}
          </div>
        )}
      </PageTemplate>
    )
  }
}

Addresses.propTypes = {
  intl: intlShape.isRequired,
  addresses: PropTypes.array,
}

const enhance = compose(
  injectIntl,
  graphql(GET_ADRESSES),
  branch(({ data }) => data.profile == null, renderComponent(AddressesLoading)),
  withProps(({ data }) => ({ addresses: data.profile.addresses })),
  withRouter,
)
export default enhance(Addresses)
