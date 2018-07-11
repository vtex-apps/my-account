import React from 'react'
import PropTypes from 'prop-types'
import ClearButton from './ClearButton'

const ContentBox = ({
  children,
  upperButton,
  onUpperButtonClick,
  lowerButton,
  onLowerButtonClick,
}) => {
  return (
    <div className="ba bw1 b--light-gray br2 ph7 pv6">
      {upperButton ? (
        <header className="flex justify-end mb6">
          <ClearButton onClick={onUpperButtonClick}>{upperButton}</ClearButton>
        </header>
      ) : null}
      {children}
      {lowerButton ? (
        <footer className="flex justify-end mt6">
          <ClearButton onClick={onLowerButtonClick}>{lowerButton}</ClearButton>
        </footer>
      ) : null}
    </div>
  )
}

ContentBox.propTypes = {
  children: PropTypes.any,
  upperButton: PropTypes.string,
  onUpperButtonClick: PropTypes.func,
  lowerButton: PropTypes.string,
  onLowerButtonClick: PropTypes.func,
}

export default ContentBox
