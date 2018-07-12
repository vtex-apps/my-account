import React from 'react'
import PropTypes from 'prop-types'
import ClearButton from './ClearButton'

const ContentBox = ({ children, width, lowerButton, onLowerButtonClick }) => {
  const widthClass = width ? 'w-' + width + '-ns' : null

  return (
    <div
      className={'ba bw1 b--light-gray br2 ph7 pv6 mb6 mr5-ns ' + widthClass}
    >
      {children}
      {lowerButton && (
        <footer className="flex justify-end mt6">
          <ClearButton onClick={onLowerButtonClick}>{lowerButton}</ClearButton>
        </footer>
      )}
    </div>
  )
}

ContentBox.propTypes = {
  children: PropTypes.any,
  width: PropTypes.number,
  lowerButton: PropTypes.string,
  onLowerButtonClick: PropTypes.func,
}

export default ContentBox
