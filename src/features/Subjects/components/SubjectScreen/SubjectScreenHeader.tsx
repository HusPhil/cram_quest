import { memo } from 'react'

interface SubjectScreenHeaderProps {
    subjectId: Number,
    subjectCodeName: String,
    subjectDescription: String,
    subjectDifficulty: Number,
}

export function SubjectScreenHeader({
    subjectId,
    subjectCodeName,
    subjectDescription,
    subjectDifficulty,
}: SubjectScreenHeaderProps) {
  return (
    <div>
        <h2 className="text-xl font-bold">{subjectCodeName}</h2>
        <p className="text-gray-700">{subjectDescription}</p>
        <p className="text-gray-500">Difficulty: {`${subjectDifficulty}`}</p>
    </div>
  )
}


export default memo(SubjectScreenHeader)