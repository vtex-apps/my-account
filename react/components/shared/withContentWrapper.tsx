import React, { ComponentType } from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'

export const withContentWrapper = (headerConfig: ContentWrapperProps) => (
  WrappedComponent: ComponentType<InjectedContentWrapperProps>
  // eslint-disable-next-line react/display-name
) => (props: { [key: string]: unknown }) => (
  <ContentWrapper {...headerConfig}>
    {({ handleError }: InjectedContentWrapperProps) => (
      <WrappedComponent {...props} handleError={handleError} />
    )}
  </ContentWrapper>
)
