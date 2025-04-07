import { useCallback } from 'react'
import { useFloatingScreen } from '../../../context/FloatingScreenContext'
import SubjectScreen from '../../Subjects/components/SubjectScreen/SubjectScreen'

const mockDataSubjects = [
  {
    "code_name": "Math 101",
    "description": "Mathematics",
    "difficulty": 1,
    "id": 0,
  },
  {
    "code_name": "Chemistry 101",
    "description": "Chemistry",
    "difficulty": 2,
    "id": 1,
  },
  {
    "code_name": "Physics 101",
    "description": "Physics",
    "difficulty": 3,
    "id": 2,
  },
  {
    "code_name": "Biology 101",
    "description": "Biology",
    "difficulty": 4,
    "id": 3,
  },
]

export default function Subjects() {
    const { openScreen, setContent} = useFloatingScreen()

    const handleOpenScreen = useCallback((
      subjectId: Number,
      subjectCodeName: String,
      subjectDescription: String,
      subjectDifficulty: Number,
    ) => {
      setContent(
        <SubjectScreen
          subjectId={subjectId}
          subjectCodeName={subjectCodeName}
          subjectDescription={subjectDescription}
          subjectDifficulty={subjectDifficulty}
          />
      )
      openScreen() 
    }, [])

    return (
    <div className="flex flex-col h-full w-full relative">
      {/* Header section - fixed at top */}
      <div className="flex-none px-4 py-2">
        <h1 className="text-2xl font-bold mb-2">Subjects</h1>
        <p className="text-gray-700">Explore various subjects and their details.</p>
      </div>

      {/* Scrollable grid section */}
      <div className="flex-1 overflow-auto flex"> 
        <div className="w-full max-h-3.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {mockDataSubjects.map((subject) => (
              <div 
                key={subject.id}
                className="bg-white p-4 rounded-lg transition-all duration-150 shadow-md 
                         hover:shadow-lg active:scale-95 active:bg-accent/5 active:shadow-inner 
                         touch-action-manipulation"
                         onClick={() => handleOpenScreen(
                          subject.id,
                          subject.code_name, 
                          subject.description, 
                          subject.difficulty,
                         )}
              >
                <h2 className="text-xl font-bold">{subject.code_name}</h2>
                <p className="text-gray-700">{subject.description}</p>
                <p className="text-gray-500">Difficulty: {subject.difficulty}</p>
              </div>
            ))}
        </div>
      </div>
        
      
      
    </div>
  )
}