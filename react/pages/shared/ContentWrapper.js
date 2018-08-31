import React from 'react'
import PropTypes from 'prop-types'

const ContentWrapper = ({ children }) => {
  return (
    <section className="pa6 pv0-m-2 pl0-m-2 pr5-m pr8-l">{children}</section>
  )
}

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ContentWrapper
