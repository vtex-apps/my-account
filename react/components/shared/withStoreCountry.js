import React from 'react'

export function withStoreCountry(Component) {
  return function CountryInjectedComponent(props) {
    return (
      <Component {...props} storeCountry={global.__RUNTIME__.culture.country} />
    )
  }
}
