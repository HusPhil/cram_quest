import React, { lazy } from "react";
import { PAGE_TITLES, PageTitle } from "../SubjectScreen/SubjectScreen";

interface PageTabProps {
  label: PageTitle;
  isActive: boolean;
  handlePageChange: (pageTitle: PageTitle) => void;
}

export default function PageTab({
  label,
  isActive,
  handlePageChange,
}: PageTabProps) {
  return (
    <button
      className={`flex-1 pb-2 text-white border-b-2 hover:text-amber-400 ${
        isActive ? "border-accent" : "border-text/50"
      }`}
      onClick={() => handlePageChange(label)}
    >
      {label}
    </button>
  );
}
