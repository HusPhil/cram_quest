import React, { useEffect, useState } from 'react'
import { getSubjects } from '../../../services/api/crud/players/getSubjects'
import { useFetchQuest } from '../../../hooks/useFetchQuest'

export default function Quests() {

  const { data, isLoading, isError, error } = useFetchQuest(1)

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isError) {
    return <div>{`${error}`}</div>
  }
  
  return (
    <>
    <div>Quests</div>
    
    <div className='flex flex-col gap-2'>
      {data.map((subject: any) => (
        <div key={subject.id} className='p-4 bg-gray-200 rounded-md'>
          <p>{subject.code_name}</p>
        </div>
      ))}
    </div>
    </>  
  )
}
