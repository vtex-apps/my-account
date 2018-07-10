import { canUseDOM } from 'exenv'
import PropTypes from 'prop-types'

const ClientSide = ({ children }) => {
  if (canUseDOM) {
    return children
  }
  return null
}

ClientSide.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ClientSide
