import React from 'react'
import PropTypes from 'prop-types'

const DataEntry = ({ label, children }) => {
  return (
    <div>
      <label className="db black-90 mb3">{label}</label>
      <div className="light black-40">{children}</div>
    </div>
  )
}

DataEntry.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
}

export default DataEntry
