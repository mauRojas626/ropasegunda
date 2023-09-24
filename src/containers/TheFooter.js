import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1"> Apoyando la venta sostenible</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
