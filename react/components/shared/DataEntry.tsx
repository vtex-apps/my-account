import React, { FunctionComponent } from 'react'

const DataEntry: FunctionComponent<Props> = ({ label, children }) => {
  return (
    <div>
      <label className="db c-on-base mb3">{label}</label>
      <div className="light c-on-disabled">{children}</div>
    </div>
  )
}

interface Props {
  label: string
}

export default DataEntry
