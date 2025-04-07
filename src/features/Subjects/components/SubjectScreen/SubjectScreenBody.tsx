import { memo, useCallback, useMemo, useState } from "react";
import PageTabs from "../PageTabs/PageTabs";
import { PAGE_TITLES, PageTitle } from "./SubjectScreen";
import LearningPage from "../PageTabs/LearningPage";
import QuestsPage from "../PageTabs/QuestsPage";
import EditPage from "../PageTabs/EditPage";

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
  const handlePageChange = useCallback((pageTitle: PageTitle) => {}, []);

  const CurrentPage = useMemo(() => {
    switch (activeTab) {
      case PAGE_TITLES.LEARNING:
        return <LearningPage />;
      case PAGE_TITLES.QUESTS:
        return <QuestsPage />;
      case PAGE_TITLES.EDIT:
        return <EditPage />;
      default:
        return null;
    }
  }, [activeTab]);

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
