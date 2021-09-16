import type { ComponentType } from 'react'
import React from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'
import { useCssHandles } from 'vtex.css-handles'

export const withContentWrapper =
  ({
    headerConfig,
    handle,
  }: {
    headerConfig: ContentWrapperProps
    handle?: { contentHandle: string; configHandle: string }
  }) =>
  (WrappedComponent: ComponentType<InjectedContentWrapperProps>) =>
  // eslint-disable-next-line react/display-name
  (props: { [key: string]: unknown }) => {
    const cssHandles = useCssHandles([
      handle?.configHandle,
      handle?.contentHandle,
    ] as const)

    const configs = {
      ...headerConfig,
      headerContent: headerConfig?.headerContent?.(handle?.contentHandle),
      namespace: `${headerConfig.namespace ?? ''} ${
        handle ? cssHandles[handle.configHandle] : ''
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
