import { memo, useState } from 'react';
import { useFloatingScreen } from '../../../context/FloatingScreenContext';
import { TbArrowLeft, TbBook } from 'react-icons/tb';
import { PAGE_TITLES, PageTitle } from '../screens/SubjectScreen/SubjectScreen';

interface SubjectScreenHeaderProps {
	subjectId: Number;
	subjectCodeName: String;
	subjectDescription: String;
	subjectDifficulty: Number;
	learningTabToggled: boolean;
	toggleLearningTab: () => boolean;
}

export function SubjectScreenHeader({
	subjectCodeName,
	subjectDescription,
	learningTabToggled,
	toggleLearningTab,
}: SubjectScreenHeaderProps) {
	const { closeScreen } = useFloatingScreen();

	const learningTabToggledBaseStyles =
		'flex px-3 py-2 items-center justify-center gap-2  rounded-md border active:bg-acent hover:scale-95 active:scale-110 transition-all duration-150';
	const learningTabToggledStyles = learningTabToggled
		? 'bg-accent text-background border-accent'
		: 'border-white/10';

	return (
		<div className="justify-start items-center h-full">
			<div className="flex justify-between w-full ">
				<button
					onClick={closeScreen}
					className="flex px-3 py-2 items-center justify-center gap-2 hover:bg-danger/25 border-danger/10 rounded-md"
				>
					<TbArrowLeft className="w-5 h-5" />
					<p className="text-sm">Subjects</p>
				</button>
				<button
					onClick={toggleLearningTab}
					className={`${learningTabToggledBaseStyles} ${learningTabToggledStyles}`}
				>
					<TbBook className="w-5 h-5" />
					<p className="text-sm">Learning</p>
				</button>
			</div>
			<div className="px-2 space-y-5 mt-5">
				<p className="line-clamp-2 text-2xl font-bold text-accent">
					{subjectDescription}
				</p>
				<small className="text-text/50">{`${subjectCodeName}`}</small>
			</div>
		</div>
	);
}

export default memo(SubjectScreenHeader);
