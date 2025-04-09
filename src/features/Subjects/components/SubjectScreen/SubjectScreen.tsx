import { memo, use, useEffect, useState } from "react";
import { SubjectScreenHeader } from "./SubjectScreenHeader";
import SubjectScreenBody from "./SubjectScreenBody";
import SubjectScreenFooter from "./SubjectScreenFooter";

export const PAGE_TITLES = {
  LEARNING: "LEARNING",
  QUESTS: "QUESTS",
  EDIT: "EDIT",
} as const;

export type PageTitle = keyof typeof PAGE_TITLES;

interface SubjectScreenProps { 
  subjectId: number;
  subjectCodeName: String;
  subjectDescription: String;
  subjectDifficulty: number;
}

export function SubjectScreen({
  subjectId,
  subjectCodeName,
  subjectDescription,
  subjectDifficulty,
}: SubjectScreenProps) {

  const [activeTab, setActiveTab] = useState<PageTitle>(PAGE_TITLES.LEARNING);
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(null);

  return (
    <div className="flex flex-1 flex-col h-full max-h-full">
      <div>
        <SubjectScreenHeader
          subjectId={subjectId}
          subjectCodeName={subjectCodeName}
          subjectDifficulty={subjectDifficulty}
          subjectDescription={subjectDescription}
        />
      </div>
      {/* Scrollable Body */}
      <div className="flex-1 min-h-0">
        <SubjectScreenBody
          subjectId={subjectId}
          subjectDifficulty={subjectDifficulty}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div>
        <SubjectScreenFooter subjectId={subjectId} />
      </div>
    </div>
  );
}

export default memo(SubjectScreen);
