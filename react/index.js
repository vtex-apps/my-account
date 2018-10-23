import React from 'react'
import AppRouter from './components/AppRouter'
import ClientSide from './components/ClientSide'
import 'vtex.country-codes/locales'
import './style.global.css'

const bootstrap = () => {
  return (
    <div className="vtex-account helvetica">
      <ClientSide>
        <AppRouter />
      </ClientSide>
    </div>
  )
}

export default bootstrap
