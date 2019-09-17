import React, { ComponentType } from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'

export const withContentWrapper = (headerConfig: any) => (
  WrappedComponent: ComponentType<{ onError: () => void }>
  // eslint-disable-next-line react/display-name
) => (props: any) => (
  <ContentWrapper {...headerConfig}>
    {({ handleError }: any) => (
      <WrappedComponent {...props} handleError={handleError} />
    )}
  </ContentWrapper>
)
