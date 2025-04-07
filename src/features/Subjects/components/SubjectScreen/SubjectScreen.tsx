import { memo } from 'react'
import { SubjectScreenHeader } from './SubjectScreenHeader'
import SubjectScreenBody from './SubjectScreenBody'
import SubjectScreenFooter from './SubjectScreenFooter'

export const PAGE_TITLES = {
    LEARNING: "LEARNING",
    QUESTS: "QUESTS",
    EDIT: "EDIT",
} as const;
  
export type PageTitle = keyof typeof PAGE_TITLES;

interface SubjectScreenProps {
    subjectId: Number,
    subjectCodeName: String,
    subjectDescription: String,
    subjectDifficulty: Number,
}

export function SubjectScreen({
    subjectId,
    subjectCodeName,
    subjectDescription,
    subjectDifficulty,
}: SubjectScreenProps) {
  return (
    <div className='flex flex-1 flex-col'>
        
        <div className=''>
            <SubjectScreenHeader
                subjectId={subjectId}
                subjectCodeName={subjectCodeName}
                subjectDifficulty={subjectDifficulty}
                subjectDescription={subjectDescription}
                />
        </div>
        <div className='flex-1'>
            <SubjectScreenBody subjectId={subjectId}/>
        </div>
        <div className=''>
            <SubjectScreenFooter subjectId={subjectId}/>
        </div>
    </div>
  )
}

export default memo(SubjectScreen)