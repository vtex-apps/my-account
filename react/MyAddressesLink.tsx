import { FunctionComponent } from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'

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

interface Props extends WrappedComponentProps {
  render: (args: { name: string; path: string }[]) => any
}

export default injectIntl(MyAddressesLink)
