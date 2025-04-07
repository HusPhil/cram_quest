import { memo, useCallback, useState } from "react"
import PageTabs from "../PageTabs/PageTabs"
import { PAGE_TITLES, PageTitle } from "./SubjectScreen"
import LearningPage from "../PageTabs/LearningPage";


interface SubjectScreenBodyProps {
  subjectId: Number
}

export function SubjectScreenBody({ 
  subjectId
}: SubjectScreenBodyProps) {

  const [activeTab, setActiveTab] = useState<PageTitle>(PAGE_TITLES.LEARNING);
  const [ currentPage, setCurrentPage ] = useState<React.ReactNode>(<LearningPage />);

  const handlePageChange = useCallback((pageTitle: PageTitle) => {
  }, [])

  return (
    <div className='h-full w-full'>
      <PageTabs 
        onPageChange={handlePageChange} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setCurrentPage={setCurrentPage}
        />
      <p>{currentPage}</p>
    </div>
  )
}

export default memo(SubjectScreenBody)