import React from 'react'

interface SubjectScreenFooterProps {
    subjectId: Number
}

export default function SubjectScreenFooter({
    subjectId
}: SubjectScreenFooterProps) {
  return (
    <div>Start Battle for subject: {subjectId.toString()}</div>
  )
}
