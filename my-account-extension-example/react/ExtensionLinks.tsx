import { FunctionComponent, ReactElement } from 'react'
import { InjectedIntl, injectIntl } from 'react-intl'

const ExtensionLinks: FunctionComponent<Props> = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage({ id: 'store/link' }),
      path: '/custom-page/custom-param',
    },
  ])
}

type Props = {
  render: (links: { name: string; path: string }[]) => ReactElement
  intl: InjectedIntl
}

export default injectIntl(ExtensionLinks)
