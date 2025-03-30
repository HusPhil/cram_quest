import { useEffect } from 'react'

export default function Quests() {

  useEffect(() => {
    console.log("Quests re rendered")
  }, [])

  return (
    <div>Quests</div>
  )
}
