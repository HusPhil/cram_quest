import { memo } from 'react'
import { useFloatingScreen } from '../../../../context/FloatingScreenContext'

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
  const { closeScreen } = useFloatingScreen()

  return (
    <div>
        <span className='flex gap-5 items-center'>
          <button onClick={closeScreen} className="mb-4 px-4 py-2 bg-accent text-white rounded">
              Close
          </button>
          <h2 className="text-xl font-bold">{subjectCodeName}</h2>
        </span>
        <p className="text-gray-700">{subjectDescription}</p>
        <p className="text-gray-500">Difficulty: {`${subjectDifficulty}`}</p>
    </div>
  )
}


export default memo(SubjectScreenHeader)