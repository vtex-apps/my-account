import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import queryString from 'query-string'
import { ContentWrapper } from 'vtex.my-account-commons'

import AddressCreateLoading from '../loaders/AddressCreateLoading'
import AddressFormBox from '../Addresses/AddressFormBox'
import GET_NEW_ADDRESS_DATA from '../../graphql/getNewAddressData.gql'

export function headerConfig() {
  return {
    namespace: 'vtex-account__address-create',
    titleId: 'pages.addressCreate',
    backButton: {
      titleId: 'pages.addresses',
      path: '/addresses',
    },
  }
}

class AddressCreate extends Component<Props> {
  private handleGoBack = () => {
    const { history } = this.props

    const parsed = queryString.parse(history.location.search)

    history.push(
      parsed.returnUrl ? parsed.returnUrl : '/addresses?success=true'
    )
  }

  public render() {
    const { profile, shipsTo } = this.props

    return (
      <ContentWrapper {...headerConfig()}>
        {({ handleError }: any) => (
          <AddressFormBox
            isNew
            onAddressSaved={this.handleGoBack}
            onError={handleError}
            profile={profile}
            shipsTo={shipsTo}
          />
        )}
      </ContentWrapper>
    )
  }
}

interface Data {
  profile: Profile
  logistics: {
    shipsTo: string[]
  }
}

interface Profile {
  firstName: string
  lastName: string
}

interface Props {
  profile: Profile
  shipsTo: string[]
  history: any
}

const enhance = compose<Props, void>(
  graphql(GET_NEW_ADDRESS_DATA),
  branch(
    ({ data }: { data: Data }) => data.profile == null,
    renderComponent(AddressCreateLoading)
  ),
  withProps(({ data }: { data: Data }) => ({
    profile: data.profile,
    shipsTo: data.logistics.shipsTo,
  }))
)

export default enhance(AddressCreate)
