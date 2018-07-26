import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'
import ContentBox from '../shared/ContentBox'
import DeleteAddress from '../../graphql/DeleteAddress.gql'
import AddressShape from '../../node_modules/@vtex/address-form/lib/propTypes/AddressShape'

class FormAddressBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDeleting: false,
    }
  }

  onDeleteClick = () => {
    if (this.state.isDeleting) return

    this.setState({
      isDeleting: true,
    })
    this.props
      .deleteAddress({
        variables: {
          addressId: this.props.address.addressId,
        },
      })
      .then(this.props.onAddressDeleted)
  }

  render() {
    const { isNew, intl } = this.props
    const { isDeleting } = this.state
    const intlId = isNew ? 'addresses.addAddress' : 'addresses.saveAddress'
    return (
      <ContentBox width={'third'}>
        <form>
          <div className="mb7">
            <Input name="address" label="Endereço" />
          </div>
          <Button type="submit" variation="secondary" block size="small">
            {intl.formatMessage({ id: intlId })}
          </Button>
          {!isNew && (
            <div className="mt5">
              <Button
                type="button"
                variation="danger"
                block
                size="small"
                onClick={this.onDeleteClick}
                isLoading={isDeleting}
              >
                {intl.formatMessage({ id: 'addresses.deleteAddress' })}
              </Button>
            </div>
          )}
        </form>
      </ContentBox>
    )
  }
}

FormAddressBox.propTypes = {
  isNew: PropTypes.bool,
  onAddressDeleted: PropTypes.func,
  address: AddressShape,
  intl: intlShape.isRequired,
}

const deleteAddressMutation = {
  name: 'deleteAddress',
  options({ addressId }) {
    return {
      variables: { addressId },
    }
  },
}
const enhance = compose(
  graphql(DeleteAddress, deleteAddressMutation),
  injectIntl,
)
export default enhance(FormAddressBox)
