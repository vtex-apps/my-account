import React from 'react'

export function withLocale(Component) {
  return function LocaleInjectedComponent(props) {
    return <Component {...props} locale={global.__RUNTIME__.culture.locale} />
  }
}
