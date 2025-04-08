import { lazy, memo, useCallback, useEffect, useMemo } from "react";
import PageTabs from "../PageTabs/PageTabs";
import { PAGE_TITLES, PageTitle } from "./SubjectScreen";

const LearningPage = lazy(() => import("../PageTabs/LearningPage"));
const QuestsPage = lazy(() => import("../PageTabs/QuestsPage"));
const EditPage = lazy(() => import("../PageTabs/EditPage"));

interface SubjectScreenBodyProps {
  subjectId: Number;
  activeTab: PageTitle;
  setActiveTab: (pageTitle: PageTitle) => void;
  setCurrentPage: (pageComponent: React.ReactNode) => void;
}

export function SubjectScreenBody({
  subjectId,
  activeTab,
  setActiveTab,
  setCurrentPage,
}: SubjectScreenBodyProps) {
  const handlePageChange = useCallback((pageTitle: PageTitle) => {
    setActiveTab(pageTitle);
  }, []);

  const CurrentPage = useMemo(() => {
    switch (activeTab) {
      case PAGE_TITLES.LEARNING:
        return <LearningPage />;
      case PAGE_TITLES.QUESTS:
        return <QuestsPage />;
      case PAGE_TITLES.EDIT:
        return <EditPage />;
      default:
        return <p>404 Not Found</p>;
    }
  }, [activeTab]);

  useEffect(() => {
    setActiveTab(PAGE_TITLES.LEARNING);
  }, [subjectId]);

  return (
    <div className="h-full w-full">
      <PageTabs
        onPageChange={handlePageChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setCurrentPage={setCurrentPage}
      />
      <p>{CurrentPage}</p>
    </div>
  );
}

export default memo(SubjectScreenBody);
