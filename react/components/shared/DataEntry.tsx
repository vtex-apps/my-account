import React, { FunctionComponent } from 'react'

import className from '../../styles/ContentBox.css'

const DataEntry: FunctionComponent<Props> = ({ label, children }) => {
  return (
    <>
      <label className={`db c-on-base mb3 ${className.dataEntryLabel}`}>
        {label}
      </label>
      <div className={`light c-on-disabled ${className.dataEntryChildren}`}>
        {children}
      </div>
    </>
  )
}

interface Props {
  label: string
}

export default DataEntry
