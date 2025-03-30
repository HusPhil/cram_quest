import React, { useEffect } from 'react'

export default function Subjects() {

  useEffect(() => {
    console.log("Subjects re rendered")
  }, [])

  return (
    <div>Subjects</div>
  )
}
    