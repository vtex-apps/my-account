declare module 'vtex.pixel-manager/PixelContext' {
  import type { PixelContext } from 'vtex.pixel-manager'

  export const usePixel: PixelContext.usePixel
  export const withPixel: PixelContext.withPixel
  export type PixelData = PixelContext.PixelData
}
