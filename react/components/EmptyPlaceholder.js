import React from 'react'

const EmptyPlaceholder = ({ children }) => {
  return (
    <div className="center w-100 helvetica">
      <div className="ba b--muted-5 bw1 bg-base pa5 tc">
        <h1 className="f4 c-muted-3 tc ttn">
          {children}
        </h1>
      </div>
    </div>
  )
}

export default EmptyPlaceholder
