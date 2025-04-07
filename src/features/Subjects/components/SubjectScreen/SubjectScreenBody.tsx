import React from 'react'


interface SubjectScreenBodyProps {
  subjectId: Number
}

export default function SubjectScreenBody({ 
  subjectId
}: SubjectScreenBodyProps) {
  return (
    <div className='h-full w-full bg-primary/30'>SubjectScreenBody {subjectId.toString()}</div>
  )
}
