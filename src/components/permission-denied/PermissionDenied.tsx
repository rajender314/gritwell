import { PiPermissionDenied } from 'pixel-kit'
import React from 'react'

const PermissionDenied = () => {
  return (
    <div>
      <PiPermissionDenied text="You do not have permission to access this page. Please contact your admin for more details." />
    </div>
  )
}

export default PermissionDenied
