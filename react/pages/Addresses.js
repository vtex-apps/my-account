import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import Header from '../components/shared/Header'
import Button from '@vtex/styleguide/lib/Button'
import ContentBox from '../components/shared/ContentBox'
import AddressBox from '../components/Addresses/AddressBox'
import DefaultAddressBox from '../components/Addresses/DefaultAddressBox'

class Addresses extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { intl } = this.props
    const pageTitle = intl.formatMessage({ id: 'pages.addresses' })

    return (
      <section>
        <div className="flex flex-column flex-row-ns items-center-ns justify-between-ns">
          <Header title={pageTitle} />
          <div className="mt6 mr5-ns">
            <Button variation="primary" block size="small">
              {intl.formatMessage({ id: 'addresses.addAddress' })}
            </Button>
          </div>
        </div>
        <main className="mt6 flex-ns flex-wrap-ns items-start-ns justify-between-ns">
          <DefaultAddressBox />
          <AddressBox />
          <AddressBox />
        </main>
      </section>
    )
  }
}

Addresses.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(Addresses)
