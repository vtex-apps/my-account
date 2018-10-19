import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import AddressesHeader from './AddressesHeader'
import AddressesLoading from './AddressesLoading'
import AddressBox from '../../components/Addresses/AddressBox'
import EmptyPlaceholder from '../../components/EmptyPlaceholder'
import Toast from '../../components/shared/Toast'
import GetAddresses from '../../graphql/getAddresses.gql'
import ContentWrapper from '../shared/ContentWrapper'

class Addresses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showToast: false,
    }
  }

  componentDidMount() {
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
    const { addresses } = this.props
    const { showToast } = this.state

    return (
      <ContentWrapper>
        <AddressesHeader />
        <main className="mt7 flex-ns flex-wrap-ns items-start-ns relative">
          {addresses ? addresses.map(address => (
            <AddressBox
              key={address.addressId}
              address={address}
              onEditClick={() => this.startEditing(address)}
            />
          )) :(
            <EmptyPlaceholder>
              <FormattedMessage id="addresses.notFound" />
            </EmptyPlaceholder>
          )}
          {showToast && (
            <Toast messageId="alert.success" onClose={this.handleCloseToast} />
          )}
        </main>
      </ContentWrapper>
    )
  }
}

Addresses.propTypes = {
  addresses: PropTypes.array,
}

const enhance = compose(
  graphql(GetAddresses),
  branch(({ data }) => data.profile == null, renderComponent(AddressesLoading)),
  withProps(({ data }) => ({ addresses: data.profile.addresses })),
  withRouter,
)
export default enhance(Addresses)
