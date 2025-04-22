import { FaStar } from 'react-icons/fa';
import NamedGiIcon from '../../../components/NamedGiIcon';
import StarRating from './StarRating';
import DeleteWithConfirm from './Pages/Quest/DeleteWithConfirm';
import { useState } from 'react';
import { toast } from 'react-toastify';
import EditButton from './Pages/Quest/EditButton';

interface SubjectCardProps {
	subjectId: number;
	code_name: string;
	description: string;
	difficulty: number;
	onClick: () => void;
}

export default function SubjectCard({
	subjectId,
	code_name,
	description,
	difficulty,
	onClick,
}: SubjectCardProps) {
	// Function to determine glow effect based on difficulty

	const [isLoading, setIsLoading] = useState(false);

	const [isEditEnabled, setIsEditEnabled] = useState(false);

	const handleDeleteConfirmed = async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		toast.info('Subject deleted successfully');
	};

	const [currentDifficulty, setCurrentDifficulty] = useState(difficulty);

	const handleUpdateDifficulty = (rating: number) => {
		if (!isEditEnabled) return;

		setCurrentDifficulty(rating);
	};
	const handleSubjectUpdate = async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		toast.info('Subject updated successfully', {
			toastId: 'subject-update-success-' + subjectId,
		});
	};

	return (
		<div
			className={`
				relative p-4 rounded-lg 
				bg-secondary/80 backdrop-blur-sm
				transition-all duration-300 cursor-pointer
				shadow-lg hover:shadow-xl
				flex flex-col gap-3 w-full
				${isLoading ? 'opacity-30 pointer-events-none' : ''} 
			`}
		>
			{/* Subject Code Name */}
			<div className="flex justify-between  items-start">
				<div className="flex-1" onClick={onClick} >
					<div className="flex items-center justify-between">
						<h3
							contentEditable={isEditEnabled}
							className="text-xl font-rpg text-accent font-bold tracking-wider"
						>
							{code_name}
						</h3>
					</div>
					{/* Description */}
					<p className="text-text/90 text-sm flex-grow overflow-hidden">
						{description}
					</p>
				</div>
				<EditButton
					isEditEnabled={isEditEnabled}
					isEditing={isLoading}
					setIsEditEnabled={setIsEditEnabled}
					setIsEditing={setIsLoading}
					updateFn={handleSubjectUpdate}
				/>
			</div>

			{/* Divider */}
			<div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

			{/* Difficulty Indicator */}
			<div className="flex items-center justify-between gap-1">
				<div className="flex-1" onClick={onClick}>
					<StarRating
						value={2}
						onChange={handleUpdateDifficulty}
						className="gap-[1.5px]"
						starClassName="w-3 h-3"
					/>
				</div>

				<DeleteWithConfirm
					deleteFn={handleDeleteConfirmed}
					setIsDeleting={setIsLoading}
				/>
			</div>
		</div>
	);
}
