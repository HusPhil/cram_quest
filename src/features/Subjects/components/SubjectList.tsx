import { memo } from 'react';
import { SubjectRead } from '../../../services/api/schema/subject_schema';
import SubjectCard from './SubjectCard';
import EmptyListNote from '../../../components/EmptyListNote';

interface SubjectListProps {
	subjects: SubjectRead[];
	currentPlayerId: number;
	handleOpenScreen: (
		subjectId: number,
		subjectCodeName: string,
		subjectDescription: string,
		subjectDifficulty: number
	) => void;
}
const SubjectList = ({
	subjects,
	currentPlayerId,
	handleOpenScreen,
}: SubjectListProps) => {
	return (
		<div className="flex-1 my-4 relative">
			{subjects.length <= 0 ? (
				<EmptyListNote
					message="Begin your journey,"
					hint="add a new subject now!"
					className="text-xl"
				/>
			) : (
				<div
					className="absolute inset-0 overflow-y-auto overscroll-behavior-y-contain
                  scroll-smooth -webkit-overflow-scrolling-touch no-scrollbar"
				>
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4
                    "
					>
						{(subjects ?? []).map((subject, index) => (
							<SubjectCard
								key={subject.id}
								index={index}
								playerId={currentPlayerId!}
								subjectId={subject.id}
								code_name={subject.code_name}
								description={subject.description}
								difficulty={subject.difficulty}
								onClick={() =>
									handleOpenScreen(
										subject.id,
										subject.code_name,
										subject.description,
										subject.difficulty
									)
								}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default memo(SubjectList);
