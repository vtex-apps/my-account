import type { FunctionComponent } from 'react'
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['dataEntryLabel', 'dataEntryChildren'] as const

const DataEntry: FunctionComponent<Props> = ({ label, children }) => {
  const cssHandles = useCssHandles(CSS_HANDLES)

  return (
    <>
      <label className={`db c-on-base mb3 ${cssHandles.dataEntryLabel}`}>
        {label}
      </label>
      <div className={`light c-on-disabled ${cssHandles.dataEntryChildren}`}>
        {children}
      </div>
    </>
  )
}

interface Props {
  label: string
}

export default DataEntry
