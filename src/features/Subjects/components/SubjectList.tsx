import { SubjectRead } from '../../../services/api/schema/subject_schema';
import SubjectCard from './SubjectCard';

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
export default function SubjectList({
	subjects,
	currentPlayerId,
	handleOpenScreen,
}: SubjectListProps) {
	return (
		<div className="flex-1 my-4 relative">
			<div
				className="absolute inset-0 overflow-y-auto overscroll-behavior-y-contain
                  scroll-smooth -webkit-overflow-scrolling-touch"
			>
				<div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4
                    "
				>
					{(subjects ?? []).map((subject) => (
						<SubjectCard
							key={subject.id}
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
		</div>
	);
}
