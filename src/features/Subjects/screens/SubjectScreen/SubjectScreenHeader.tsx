import { memo } from 'react';
import { useFloatingScreen } from '../../../../context/FloatingScreenContext';
import { FaArrowLeft, FaBackspace } from 'react-icons/fa';

interface SubjectScreenHeaderProps {
	subjectId: Number;
	subjectCodeName: String;
	subjectDescription: String;
	subjectDifficulty: Number;
}

export function SubjectScreenHeader({
	subjectId,
	subjectCodeName,
	subjectDescription,
	subjectDifficulty,
}: SubjectScreenHeaderProps) {
	const { closeScreen } = useFloatingScreen();

	return (
		<div className="flex justify-start items-center mr-2 h-full">
			<div className="h-full">
				<button onClick={closeScreen} className="pl-2 pr-7 py-2 h-full">
					<FaArrowLeft />
				</button>
			</div>
			<div>
				<h2 className="line-clamp-2  text-xl font-bold">
					{subjectDescription}
				</h2>
				<small className="text-text/40">{`${subjectCodeName}`}</small>
			</div>
		</div>
	);
}

export default memo(SubjectScreenHeader);
