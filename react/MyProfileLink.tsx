import { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'

const MyProfileLink: FunctionComponent<Props> = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage({
        id: 'pages.profile',
        from: 'vtex.store-messages',
      }),
      path: '/profile',
    },
  ])
}

interface Props extends InjectedIntlProps {
  render: (args: { name: string; path: string }[]) => any
}

export default injectIntl(MyProfileLink)
