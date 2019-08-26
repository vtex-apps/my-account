import { FunctionComponent } from 'react'
import { canUseDOM } from 'exenv'

const ClientSide: FunctionComponent<any> = ({ children }) => {
  if (canUseDOM) {
    return children
  }
  return null
}

export default ClientSide
