/* eslint-disable no-restricted-globals */
import { useMemo, FunctionComponent, ReactElement } from 'react'
import { useRuntime } from 'vtex.render-runtime'

import useDataPixel from '../hooks/useDataPixel'

const MyAccountWrapper: FunctionComponent<{ children: ReactElement }> = ({
  children,
}) => {
  const { account } = useRuntime()

  const pixelEvents = useMemo(() => {
    if (typeof document === 'undefined') {
      return null
    }

    return [
      {
        event: 'pageView',
        pageTitle: document.title,
        pageUrl: location.href,
        referrer:
          document.referrer.indexOf(location.origin) === 0
            ? undefined
            : document.referrer,
        accountName: account,
      },
      {
        event: 'account',
        eventType: 'accountView',
        accountName: account,
        pageTitle: document.title,
        pageUrl: location.href,
        pageCategory: 'MyAccount',
      },
    ]
  }, [account])

  useDataPixel(pixelEvents, 'MyAccount')

  return children
}

export default MyAccountWrapper
