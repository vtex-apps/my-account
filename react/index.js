import React from 'react'
import AppRouter from './components/AppRouter'
import ClientSide from './components/ClientSide'
import 'vtex.country-codes/locales'

import styles from './styles.css'

const bootstrap = () => {
  return (
    <div className={`${styles.account} helvetica flex justify-around`}>
      <ClientSide>
        <AppRouter />
      </ClientSide>
    </div>
  )
}

export default bootstrap
