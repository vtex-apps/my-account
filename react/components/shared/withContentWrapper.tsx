import React, { ComponentType } from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'
import { useCssHandles } from 'vtex.css-handles'

export const withContentWrapper = ({
  headerConfig,
  handle,
}: {
  headerConfig: ContentWrapperProps
  handle?: string
}) => (
  WrappedComponent: ComponentType<InjectedContentWrapperProps>
  // eslint-disable-next-line react/display-name
) => (props: { [key: string]: unknown }) => {
  const cssHandles = useCssHandles([handle] as const)
  const configs = {
    ...headerConfig,
    namespace: `${headerConfig.namespace ?? ''} ${
      handle ? cssHandles[handle] : ''
    }`,
  }

  return (
    <ContentWrapper {...configs}>
      {({ handleError }: InjectedContentWrapperProps) => (
        <WrappedComponent {...props} handleError={handleError} />
      )}
    </ContentWrapper>
  )
}
