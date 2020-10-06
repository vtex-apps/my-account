import { useEffect, useRef } from 'react'
// eslint-disable-next-line no-restricted-imports
import { isEmpty } from 'ramda'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

const useDataPixel = (
  data: any[] | null,
  pageIdentifier: any,
  isLoading = false
) => {
  const { push } = usePixel()
  const previousIdRef = useRef(null)

  const previousId = previousIdRef.current

  useEffect(() => {
    if (pageIdentifier && !isLoading && previousId !== pageIdentifier) {
      if (!data || isEmpty(data)) {
        return
      }

      if (Array.isArray(data)) {
        data.forEach(push)
      } else {
        push(data)
      }

      previousIdRef.current = pageIdentifier
    }
  }, [data, isLoading, pageIdentifier, previousId, push])
}

export default useDataPixel
