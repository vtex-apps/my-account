import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { ContentWrapper } from 'vtex.my-account-commons'

import AddressCreateLoading from '../loaders/AddressCreateLoading'
import AddressFormBox from '../Addresses/AddressFormBox'
import GET_NEW_ADDRESS_DATA from '../../graphql/getNewAddressData.gql'

export const headerConfig = () => {
  return {
    namespace: 'vtex-account__address-create',
    titleId: 'pages.addressCreate',
    backButton: {
      titleId: 'pages.addresses',
      path: '/addresses',
    },
  }
}

class AddressCreate extends Component {
  handleGoBack = () => {
    this.props.history.push('/addresses?success=true')
  }

  render() {
    const { profile, shipsTo } = this.props

    return (
      <ContentWrapper {...headerConfig()}>
        {onError => (
          <AddressFormBox
            isNew
            onAddressSaved={this.handleGoBack}
            onError={onError}
            profile={profile}
            shipsTo={shipsTo}
          />
        )}
      </ContentWrapper>
    )
  }
}

AddressCreate.propTypes = {
  profile: PropTypes.object.isRequired,
  shipsTo: PropTypes.array.isRequired,
  history: PropTypes.object,
}

const enhance = compose(
  graphql(GET_NEW_ADDRESS_DATA),
  branch(
    ({ data }) => data.profile == null,
    renderComponent(AddressCreateLoading)
  ),
  withProps(({ data }) => ({
    profile: data.profile,
    shipsTo: data.logistics.shipsTo,
  }))
)

export default enhance(AddressCreate)
