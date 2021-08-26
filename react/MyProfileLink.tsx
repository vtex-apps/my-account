import type { FunctionComponent } from 'react'
import type { InjectedIntlProps} from 'react-intl';
import { injectIntl } from 'react-intl'

const MyProfileLink: FunctionComponent<Props> = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage({
        id: 'vtex.store-messages@0.x::pages.profile',
      }),
      path: '/profile',
    },
  ])
}

interface Props extends InjectedIntlProps {
  render: (args: Array<{ name: string; path: string }>) => any
}

export default injectIntl(MyProfileLink)
