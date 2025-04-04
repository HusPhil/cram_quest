import React, { useEffect } from 'react'
import { getSubjects } from '../../../utils/api/crud/players/getSubjects'

export default function Quests() {

  useEffect(() => {
    const fetchSubjects = async () => {
      
      const res = await getSubjects()
      console.log(res)
    }

    fetchSubjects()
  }, [])

  return (
    <div>Quests</div>
  )
}
