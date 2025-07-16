import { useEffect, useState } from 'react';
import SubjectStatus from './SubjectStatus';
import SubjectMaterials from './SubjectMaterials';
import { useGetMaterial } from '../../../../hooks/useGetMaterial';

interface LearningPageProps {
	subjectId: number;
	subjectDifficulty: number;
}

export type MaterialType = 'Note' | 'Video' | 'Flashcard';

export default function LearningPage({
	subjectId,
	subjectDifficulty,
}: LearningPageProps) {
	const [rating, setRating] = useState(subjectDifficulty);

	useEffect(() => {
		setRating(subjectDifficulty);
	}, [subjectDifficulty]);

	const { data: materials, isLoading, isError } = useGetMaterial(subjectId);

	const subjectStatus = 'I feel great about this subject'; // hardcoded for now

	return (
		<>
			<div className="flex flex-1 flex-col">
				<SubjectStatus
					subjectId={subjectId}
					rating={rating}
					setRating={setRating}
					subjectStatus={subjectStatus}
				/>

				<div className="mt-4">
					{isLoading && <p>Loading materials...</p>}
					{isError && <p>Failed to load materials</p>}
					{!isLoading && !isError && materials && (
						<SubjectMaterials
							subjectId={subjectId}
							materials={materials}
						/>
					)}
				</div>
			</div>
		</>
	);
}
