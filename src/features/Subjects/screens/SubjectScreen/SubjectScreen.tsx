import { memo, useEffect, useState } from 'react';
import { SubjectScreenHeader } from '../../components/SubjectScreenHeader';
import SubjectScreenBody from '../../components/SubjectScreenBody';
import SubjectScreenFooter from '../../components/SubjectScreenFooter';
import {
	ModalObjectMap,
	useSubjectStore_UI,
} from '../../stores/subjectStore_UI';
import AddNewQuestModal from '../../modals/AddNewQuestModal';
import AddNewMaterialModal from '../../modals/AddNewMaterialModal';
import EditMaterialModal from '../../modals/EditMaterialModal';
import StartBattleModal from '../../modals/StartBattleModal';
import ViewQuestModal from '../../modals/ViewQuestModal';

export const PAGE_TITLES = {
	QUESTS: 'QUESTS',
	LEARNING: 'LEARNING',
} as const;

export type PageTitle = keyof typeof PAGE_TITLES;

interface SubjectScreenProps {
	subjectId: number;
	subjectCodeName: string;
	subjectDescription: string;
	subjectDifficulty: number;
}

export function SubjectScreen({
	subjectId,
	subjectCodeName,
	subjectDescription,
	subjectDifficulty,
}: SubjectScreenProps) {
	const activeModalObject = useSubjectStore_UI(
		(state) => state.activeModalObject
	);

	const [activeTab, setActiveTab] = useState<PageTitle>(PAGE_TITLES.QUESTS);
	const [_, setCurrentPage] = useState<React.ReactNode>(null);
	const subjectQuests = useSubjectStore_UI((state) => state.subjectQuests);

	const handleToggleLearningTab = () => {
		setActiveTab((prev) =>
			prev !== PAGE_TITLES.LEARNING
				? PAGE_TITLES.LEARNING
				: PAGE_TITLES.QUESTS
		);

		return activeTab === PAGE_TITLES.LEARNING;
	};

	useEffect(() => {
		if (activeModalObject) {
			console.log('activeModalObject: ', activeModalObject);
		}
	}, [activeModalObject]);

	return (
		<>
			<div className="flex flex-1 flex-col w-full max-w-[1200px] h-[100dvh] max-h-full mx-2.5 py-5 ">
				<div>
					<SubjectScreenHeader
						subjectId={subjectId}
						subjectCodeName={subjectCodeName}
						subjectDifficulty={subjectDifficulty}
						subjectDescription={subjectDescription}
						learningTabToggled={activeTab === PAGE_TITLES.LEARNING}
						toggleLearningTab={handleToggleLearningTab}
					/>
				</div>
				{/* Scrollable Body */}
				<div className="flex-1 min-h-0 px-2">
					<SubjectScreenBody
						subjectId={subjectId}
						subjectCodeName={subjectCodeName}
						subjectDescription={subjectDescription}
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

			<AddNewQuestModal subjectId={subjectId} />

			<AddNewMaterialModal subjectId={subjectId} />

			<EditMaterialModal
				material={
					activeModalObject as ModalObjectMap['EditMaterialModal']
				}
			/>

			<ViewQuestModal
				quest={activeModalObject as ModalObjectMap['ViewQuestModal']}
			/>

			<StartBattleModal
				subjectId={subjectId}
				subjectQuests={subjectQuests || undefined}
				initialStepNumber={
					(activeModalObject as ModalObjectMap['StartBattleModal'])
						?.initialStep || undefined
				}
			/>
		</>
	);
}

export default memo(SubjectScreen);
