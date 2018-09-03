import React from 'react'
import PropTypes from 'prop-types'

const DataEntry = ({ label, children }) => {
  return (
    <div>
      <label className="db c-on-base mb3">{label}</label>
      <div className="light c-on-disabled">{children}</div>
    </div>
  )
}

DataEntry.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
}

export default DataEntry
