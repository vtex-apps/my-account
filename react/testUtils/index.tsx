import React, { ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import * as reactTestingLibrary from 'react-testing-library'

import defaultStrings from '../../messages/en.json'

const customRender = (node: ReactNode, options?: any) => {
  const rendered = reactTestingLibrary.render(
    <IntlProvider messages={defaultStrings} locale="en-US">
      {node}
    </IntlProvider>,
    options
  )

  return {
    ...rendered,
    rerender: (newUi: any) =>
      customRender(newUi, {
        baseElement: rendered.baseElement,
        container: rendered.container,
      }),
  }
}

// re-export everything
export const render = customRender
export default {
  ...reactTestingLibrary,
}
