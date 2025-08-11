import { useEffect, useState } from 'react';
import LearningStatus from '../../../components/SubjectStatus';
import SubjectMaterials from '../../../components/learning/LearningMaterials';
import { useGetMaterials } from '../../../hooks/material/useGetMaterials';
import TagLabel from '../../../../../components/TagLabel';
import { FaPlus } from 'react-icons/fa';
import { useSubjectStore_UI } from '../../../stores/subjectStore_UI';
import QuestsPageSkeleton from '../../../../../components/Skeletons/QuestPageSkeleton';

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
	const setActiveModal = useSubjectStore_UI((state) => state.setActiveModal);

	useEffect(() => {
		setRating(subjectDifficulty);
	}, [subjectDifficulty]);

	const { data: materials, isLoading, isError } = useGetMaterials(subjectId);

	const subjectStatus = 'I feel great about this subject'; // hardcoded for now

	return (
		<div className="flex flex-1 h-full max-h-full flex-col">
			<LearningStatus
				subjectId={subjectId}
				rating={rating}
				setRating={setRating}
				subjectStatus={subjectStatus}
			/>

			{/* Header */}
			<div className="flex items-center justify-between my-2">
				<span className="flex gap-2">
					<h1 className="text-md font-bold">Materials</h1>
					<TagLabel className="flex items-center rounded-full px-2">
						<p className="text-xs">
							{materials?.length.toString()}
						</p>
					</TagLabel>
				</span>
				<button
					className="flex items-center gap-1 py-1 px-3 bg-accent text-background border-accent border rounded-md active:scale-95 transition-transform"
					onClick={() => setActiveModal('AddNewMaterialModal')}
				>
					<FaPlus className="w-3 h-3" />
					<p className="text-sm">Add</p>
				</button>
			</div>

			<div className="overflow-auto h-full no-scrollbar flex-1 mt-1 space-y-3">
				{isLoading || isError || !materials ? (
					<QuestsPageSkeleton />
				) : (
					<SubjectMaterials
						subjectId={subjectId}
						materials={materials}
					/>
				)}
			</div>
		</div>
	);
}
