import React from 'react'
import PropTypes from 'prop-types'
import ClearButton from './ClearButton'

const ContentBox = ({ children, width, lowerButton, onLowerButtonClick }) => {
  const widthClass = width && `w-${width}-ns`
  return (
    <div className={'pb5 pr5-ns ' + widthClass}>
      <article className={'ba bw1 b--light-gray br2'}>
        <main className="ph7 pv5">{children}</main>
        {lowerButton && (
          <footer className="flex justify-end ph7 pb5">
            <ClearButton onClick={onLowerButtonClick}>
              {lowerButton}
            </ClearButton>
          </footer>
        )}
      </article>
    </div>
  )
}

ContentBox.propTypes = {
  children: PropTypes.any,
  width: PropTypes.string,
  lowerButton: PropTypes.string,
  onLowerButtonClick: PropTypes.func,
}

export default ContentBox
