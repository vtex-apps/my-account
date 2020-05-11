import React from 'react'
import { SkeletonBox } from 'vtex.my-account-commons'

import Content from './FormContent'

const FormLoader = () => (
  <SkeletonBox shouldAllowGrowing maxWidthStep={6}>
    <Content />
  </SkeletonBox>
)

export default FormLoader
