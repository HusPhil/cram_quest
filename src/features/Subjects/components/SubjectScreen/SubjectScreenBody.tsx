import { lazy, memo, useCallback, useEffect, useMemo } from "react";
import PageTabs from "../PageTabs/PageTabs";
import { PAGE_TITLES, PageTitle } from "./SubjectScreen";

const LearningPage = lazy(() => import("../Pages/Learning/LearningPage"));
const QuestsPage = lazy(() => import("../Pages/Quest/QuestsPage"));
const EditPage = lazy(() => import("../Pages/EditPage"));

interface SubjectScreenBodyProps {
  subjectId: number;
  subjectCodeName: string;
  subjectDifficulty: number;
  subjectDescription: string;
  activeTab: PageTitle;
  setActiveTab: (pageTitle: PageTitle) => void;
  setCurrentPage: (pageComponent: React.ReactNode) => void;
}

export function SubjectScreenBody({
  subjectId,
  activeTab,
  subjectDifficulty,
  subjectCodeName,
  subjectDescription,
  setActiveTab,
  setCurrentPage,
}: SubjectScreenBodyProps) {
  const handlePageChange = useCallback((pageTitle: PageTitle) => {
    setActiveTab(pageTitle);
  }, []);

  const CurrentPage = useMemo(() => {
    switch (activeTab) {
      case PAGE_TITLES.LEARNING:
        return (
          <LearningPage
            subjectId={subjectId}
            subjectDifficulty={subjectDifficulty}
          />
        );
      case PAGE_TITLES.QUESTS:
        return <QuestsPage />;
      case PAGE_TITLES.EDIT:
        return (
          <EditPage
            subjectId={subjectId}
            subjectDescription={subjectDescription}
            subjectCodeName={subjectCodeName}
          />
        );
      default:
        return <p>404 Not Found</p>;
    }
  }, [activeTab, subjectDifficulty, subjectId]);

  useEffect(() => {
    setActiveTab(PAGE_TITLES.LEARNING);
    // alert(subjectDifficulty)
  }, [subjectId]);

  return (
    <div className="flex flex-col h-full max-h-full">
      {/* Tabs stay fixed */}
      <div className="shrink-0">
        <PageTabs
          onPageChange={handlePageChange}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Scrollable page content */}
      <div className="flex-1 min-h-0 overflow-auto no-scrollbar">
        {CurrentPage}
      </div>
    </div>
  );
}

export default memo(SubjectScreenBody);
