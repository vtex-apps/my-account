import React from 'react'
import PropTypes from 'prop-types'

const ClearButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="blue no-underline f5 b db pv3 ph0 bg-white b--none pointer hover-heavy-blue"
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
