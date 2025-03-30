import React, { useEffect } from 'react'

export default function Battle() {

  useEffect(() => {
    console.log("Battle re rendered")
  }, [])

  return (
    <div>Battle</div>
  )
}
