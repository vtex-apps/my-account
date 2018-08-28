import React from 'react'
import PropTypes from 'prop-types'

const ClearButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="c-link no-underline f5 b db pv3 ph0 bg-base b--none pointer hover-c-link"
    >
      {children}
    </button>
  )
}

ClearButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
}

export default ClearButton
