import React from 'react'
import PropTypes from 'prop-types'
import ClearButton from './ClearButton'

const ContentBox = ({
  children,
  width,
  header,
  lowerButton,
  onLowerButtonClick,
  upperButton,
  onUpperButtonClick,
}) => {
  const widthClass = width && `w-${width}-ns`
  return (
    <div className={'pb5 pr5-ns ' + widthClass}>
      <article className={'ba bw1 b--light-gray br2'}>
        {header && (
          <header className="bg-black-10 pv5 f7 ph7 black-90">{header}</header>
        )}
        {upperButton && (
          <header className="flex justify-end pt5 ph7">
            <ClearButton onClick={onUpperButtonClick}>
              {upperButton}
            </ClearButton>
          </header>
        )}
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
  header: PropTypes.string,
  width: PropTypes.string,
  lowerButton: PropTypes.string,
  onLowerButtonClick: PropTypes.func,
  upperButton: PropTypes.string,
  onUpperButtonClick: PropTypes.func,
}

export default ContentBox
