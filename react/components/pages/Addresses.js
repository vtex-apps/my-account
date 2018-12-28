import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter, Link } from 'vtex.my-account-commons/Router'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { EmptyState, Button } from 'vtex.styleguide'
import { ContentWrapper } from 'vtex.my-account-commons'

import AddressesLoading from '../loaders/AddressesLoading'
import AddressBox from '../Addresses/AddressBox'
import Toast from '../shared/Toast'
import FormattedMessage from '../shared/FormattedMessage'

import GET_ADRESSES from '../../graphql/getAddresses.gql'

import styles from '../../styles.css'

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
    const content = (
      <div
        className={`
          ${styles.addressBox} flex-ns flex-wrap-ns items-start-ns relative tl
        `}>
        {this.props.addresses.map(address => (
          <AddressBox
            key={address.addressId}
            address={address}
            onEditClick={() => this.startEditing(address)}
          />
        ))}

        {this.state.showToast && (
          <Toast messageId="alert.success" onClose={this.handleCloseToast} />
        )}
      </div>
    )

    return renderWrapper(content)
  }
}

Addresses.propTypes = {
  location: PropTypes.any,
  history: PropTypes.object,
  addresses: PropTypes.array,
}

const enhance = compose(
  graphql(GET_ADRESSES),
  branch(({ data }) => data.loading, renderComponent(AddressesLoading)),
  branch(
    ({ data }) => data.profile == null || data.profile.addresses.length === 0,
    renderComponent(EmptyAddresses)
  ),
  withProps(({ data }) => ({ addresses: data.profile.addresses })),
  withRouter
)

export default enhance(Addresses)

function EmptyAddresses() {
  const title = <FormattedMessage id="addresses.notFound" />

  const content = <EmptyState title={title} />

  return renderWrapper(content)
}

function renderWrapper(children) {
  return <ContentWrapper {...headerConfig()}>{() => children}</ContentWrapper>
}

export function headerConfig() {
  const headerContent = (
    <Link to="/addresses/new">
      <Button variation="primary" block size="small">
        <FormattedMessage id="addresses.addAddress" />
      </Button>
    </Link>
  )

  return {
    namespace: `${styles.addressList}`,
    titleId: 'pages.addresses',
    headerContent,
  }
}
