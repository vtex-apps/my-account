import PropTypes from 'prop-types'
import Amex from './flags/Amex'
import Visa from './flags/Visa'
import Diners from './flags/Diners'
import MasterCard from './flags/MasterCard'
import Discover from './flags/Discover'
import Hipercard from './flags/Hipercard'
import Elo from './flags/Elo'
import JCB from './flags/JCB'

const flagsMap = [
  { id: '1', component: Amex },
  { id: '2', component: Visa },
  { id: '3', component: Diners },
  { id: '4', component: MasterCard },
  { id: '5', component: Discover },
  { id: '8', component: Hipercard },
  { id: '9', component: Elo },
  { id: '21', component: JCB },
]

const PaymentFlagPicker = ({ children, paymentSystem }) => {
  const paymentFlag = flagsMap.find(flag => flag.id === paymentSystem)
  return paymentFlag ? children(paymentFlag.component) : null
}

PaymentFlagPicker.propTypes = {
  paymentSystem: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}

export default PaymentFlagPicker
