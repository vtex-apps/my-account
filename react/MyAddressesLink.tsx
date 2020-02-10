import { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'

const MyAddressesLink: FunctionComponent<Props> = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage({
        id: 'pages.addresses',
        from: 'vtex.store-messages',
      }),
      path: '/addresses',
    },
  ])
}

interface Props extends InjectedIntlProps {
  render: (args: { name: string; path: string }[]) => any
}

export default injectIntl(MyAddressesLink)
