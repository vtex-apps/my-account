import React from 'react'
import AppRouter from './components/AppRouter'
import ClientSide from './components/ClientSide'
import 'vtex.country-codes/locales'
import './style.global.css'

const bootstrap = () => {
  return (
    <ClientSide>
      <AppRouter />
    </ClientSide>
  )
}

export default bootstrap
