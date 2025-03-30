import React, { useEffect } from 'react'

export default function SessionLogs() {

  useEffect(() => {
    console.log("SessionLogs re rendered")
  }, [])

  return (
    <div>SessionLogs</div>
  )
}
