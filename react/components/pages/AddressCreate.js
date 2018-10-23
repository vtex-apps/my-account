import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'

import AddressCreateHeader from '../headers/AddressCreateHeader'
import AddressCreateLoading from '../loaders/AddressCreateLoading'
import AddressFormBox from '../Addresses/AddressFormBox'
import PageTemplate from '../shared/PageTemplate'
import GET_NEW_ADDRESS_DATA from '../../graphql/getNewAddressData.gql'

class AddressCreate extends Component {
  goBack = () => {
    this.props.history.push('/addresses?success=true')
  }

  render() {
    const { profile, shipsTo } = this.props

    return (
      <PageTemplate 
        header={<AddressCreateHeader />}
      >
        {onError => (
          <AddressFormBox
            isNew
            onAddressSaved={this.goBack}
            onError={onError}
            profile={profile}
            shipsTo={shipsTo}
          />
        )}
      </PageTemplate>
    )
  }
}

AddressCreate.propTypes = {
  profile: PropTypes.object.isRequired,
  shipsTo: PropTypes.array.isRequired,
}

const enhance = compose(
  graphql(GET_NEW_ADDRESS_DATA),
  branch(
    ({ data }) => data.profile == null,
    renderComponent(AddressCreateLoading),
  ),
  withProps(({ data }) => ({
    profile: data.profile,
    shipsTo: data.logistics.shipsTo,
  })),
)
export default enhance(AddressCreate)
