import React, { ComponentType } from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'

export const withContentWrapper = (headerConfig: any) => (
  WrappedComponent: ComponentType<ContentWrapperProps>
  // eslint-disable-next-line react/display-name
) => (props: {}) => (
  <ContentWrapper {...headerConfig}>
    {({ handleError }: ContentWrapperProps) => (
      <WrappedComponent {...props} handleError={handleError} />
    )}
  </ContentWrapper>
)
