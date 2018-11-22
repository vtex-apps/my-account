import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'vtex.styleguide'

const ContentBox = ({
  children,
  maxWidthStep,
  shouldAllowGrowing,
  lowerButton,
  onLowerButtonClick,
}) => {
  const widthClass = maxWidthStep ? `mw${maxWidthStep}-ns` : ''
  const flexClass = shouldAllowGrowing ? 'flex-auto' : 'flex-none'
  return (
    <div className={`pb5 pr5-ns ${flexClass} ${widthClass}`}>
      <article className="ba bw1 b--muted-4 br2 flex flex-column justify-between">
        <main className="ph7 pv6">{children}</main>
        {lowerButton && (
          <footer className="flex justify-end ph3 pb3">
            <Button
              variation="tertiary"
              size="small"
              onClick={onLowerButtonClick}>
              {lowerButton}
            </Button>
          </footer>
        )}
      </article>
    </div>
  )
}

ContentBox.defaultProps = {
  shouldAllowGrowing: false,
}

ContentBox.propTypes = {
  children: PropTypes.any,
  maxWidthStep: PropTypes.number,
  shouldAllowGrowing: PropTypes.bool,
  lowerButton: PropTypes.string,
  onLowerButtonClick: PropTypes.func,
}

export default ContentBox
