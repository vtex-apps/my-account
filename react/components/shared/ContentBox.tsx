import React, { FunctionComponent, ReactElement } from 'react'
import { Button } from 'vtex.styleguide'
import className from '../../styles/ContentBox.css'


const ContentBox: FunctionComponent<Props> = ({
  children,
  maxWidthStep,
  shouldAllowGrowing = false,
  lowerButton,
  onLowerButtonClick,
}) => {
  const widthClass = maxWidthStep ? `mw${maxWidthStep}-ns` : ''
  const flexClass = shouldAllowGrowing ? 'flex-auto' : 'flex-none'
  return (
    <div className={`pb5 pr5-ns ${flexClass} ${widthClass}`}>
      <article className={`ba bw1 b--muted-4 br2 flex flex-column justify-between ${className.boxContainer}`}>
        <main className={`ph7 pv6 ${className.boxContainerBody}`}>{children}</main>
        {lowerButton && (
          <footer className={`flex justify-end ph3 pb3 ${className.boxContainerFooter}`}>
            <Button
              variation="tertiary"
              size="small"
              onClick={onLowerButtonClick}
            >
              {lowerButton}
            </Button>
          </footer>
        )}
      </article>
    </div>
  )
}

interface Props {
  maxWidthStep?: number
  shouldAllowGrowing?: boolean
  lowerButton?: ReactElement
  onLowerButtonClick?: () => void
}

export default ContentBox
