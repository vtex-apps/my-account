import React from 'react'
import AppRouter from './components/AppRouter'
import ClientSide from './components/ClientSide'

const bootstrap = () => {
    return ( 
        <ClientSide>
            <AppRouter />
        </ClientSide>
    )
}

export default bootstrap