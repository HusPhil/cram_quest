import React, { memo, useCallback, useState } from "react";
import { PAGE_TITLES, PageTitle } from "../SubjectScreen/SubjectScreen";
import PageTab from "./PageTab";
import LearningPage from "./LearningPage";
import QuestsPage from "./QuestsPage";
import EditPage from "./EditPage";

interface PageTabsProps {
  activeTab: PageTitle;
  setActiveTab: (pageTitle: PageTitle) => void;
  setCurrentPage: (pageComponent: React.ReactNode) => void;
  onPageChange: (pageTitle: PageTitle) => void;
}

export function PageTabs({
  activeTab,
  setActiveTab,
  setCurrentPage,
  onPageChange,
}: PageTabsProps) {
  const handleOnPageChange = useCallback((pageTitle: PageTitle) => {
    onPageChange(pageTitle);
    setActiveTab(pageTitle);

    switch (pageTitle) {
      case PAGE_TITLES.LEARNING:
        setCurrentPage(<LearningPage />);
        break;
      case PAGE_TITLES.QUESTS:
        setCurrentPage(<QuestsPage />);
        break;
      case PAGE_TITLES.EDIT:
        setCurrentPage(<EditPage />);
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="flex justify-between items-center bg-primary/0 py-3">
      {Object.entries(PAGE_TITLES).map(([key, value]) => (
        <PageTab
          key={key}
          isActive={activeTab === key}
          label={value}
          handlePageChange={handleOnPageChange}
        />
      ))}
    </div>
  );
}

export default memo(PageTabs);
