import { useEffect } from 'react'


export default function Quests() {

  useEffect(() => {
    console.log("Quests re rendered")
  }, [])

  return (
    <div>
      <img src="src\assets\Skeleton_Big.png" alt="" />  
    </div>
  )
}
