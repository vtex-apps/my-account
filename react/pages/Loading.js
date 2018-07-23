import React from 'react'
import Spinner from '@vtex/styleguide/lib/Spinner'

const Loading = () => {
  return (
    <section className="flex items-center justify-center h-100">
      <Spinner />
    </section>
  )
}

Loading.propTypes = {}

export default Loading
