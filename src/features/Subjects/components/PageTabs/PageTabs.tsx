import React, { memo, useCallback } from "react";
import { PAGE_TITLES, PageTitle } from "../SubjectScreen/SubjectScreen";
import PageTab from "./PageTab";

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

  return (
    <div className="flex justify-between items-center bg-primary/0 py-3 text-lg">
      {Object.entries(PAGE_TITLES).map(([key, value]) => (
        <PageTab
          key={key}
          isActive={activeTab === key}
          label={value}
          handlePageChange={onPageChange}
        />
      ))}
    </div>
  );
}

export default memo(PageTabs);
