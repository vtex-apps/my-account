import React from 'react'

export function withRuntime(Component) {
  return function RuntimeInjectedComponent(props) {
    return <Component {...props} runtime={global.__RUNTIME__} />
  }
}
