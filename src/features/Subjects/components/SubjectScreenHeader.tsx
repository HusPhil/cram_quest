import { memo } from 'react';
import { useFloatingScreen } from '../../../context/FloatingScreenContext';
import { FaArrowLeft } from 'react-icons/fa';

interface SubjectScreenHeaderProps {
	subjectId: Number;
	subjectCodeName: String;
	subjectDescription: String;
	subjectDifficulty: Number;
}

export function SubjectScreenHeader({
	subjectCodeName,
	subjectDescription,
}: SubjectScreenHeaderProps) {
	const { closeScreen } = useFloatingScreen();

	return (
		<div className="justify-start items-center h-full">
			<button
				onClick={closeScreen}
				className="flex px-3 py-2 items-center justify-center gap-2 hover:bg-danger/25 border-danger/10 rounded-md"
			>
				<FaArrowLeft />
				<p className="text-sm">Back to Subjects</p>
			</button>
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
