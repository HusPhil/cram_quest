import { FaStar } from 'react-icons/fa';
import NamedGiIcon from '../../../components/NamedGiIcon';
import StarRating from './StarRating';
import DeleteWithConfirm from './Pages/Quest/DeleteWithConfirm';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import EditButton from './Pages/Quest/EditButton';
import { putCursorToFront } from '../../../utils/putCursorToFront';
import { useDeleteSubject } from '../hooks/useDeleteSubject';
import { useQueryClient } from '@tanstack/react-query';

interface SubjectCardProps {
	playerId: number;
	subjectId: number;
	code_name: string;
	description: string;
	difficulty: number;
	onClick: () => void;
}

export default function SubjectCard({
	playerId,
	subjectId,
	code_name,
	description,
	difficulty,
	onClick,
}: SubjectCardProps) {
	// Function to determine glow effect based on difficulty

	const SUBJECTS_QUERY_KEY = ['players', playerId, 'subjects'];

	const [isLoading, setIsLoading] = useState(false);

	const [isEditEnabled, setIsEditEnabled] = useState(false);

	const codeNameRef = useRef<HTMLHeadingElement | null>(null);
	const descriptionRef = useRef<HTMLElement>(null);

	const queryClient = useQueryClient();

	const deleteSubjectMutate = useDeleteSubject();

	const handleDeleteConfirmed = async () => {
		await deleteSubjectMutate.mutateAsync({ subjectId: subjectId });

		if (!deleteSubjectMutate.isError) {
			queryClient.invalidateQueries({
				queryKey: SUBJECTS_QUERY_KEY,
			});
			toast.success('Quest deleted successfully');
		}
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

	useEffect(() => {
		if (isEditEnabled && codeNameRef.current) {
			putCursorToFront(codeNameRef.current);
			codeNameRef.current.focus();
		}
	}, [isEditEnabled]);

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
				<div
					className="flex-1"
					onClick={isEditEnabled ? undefined : onClick}
				>
					<div className="flex items-center justify-between">
						<h3
							ref={codeNameRef}
							contentEditable={isEditEnabled}
							className={`text-xl font-rpg text-accent font-bold tracking-wider
								${
									isEditEnabled
										? 'bg-yellow-100 p-1 border-yellow-400 text-background'
										: 'border-transparent'
								} `}
						>
							{code_name}
						</h3>
					</div>
					{/* Description */}
					<p
						contentEditable={isEditEnabled}
						className={` text-sm flex-grow overflow-hidden
						${
							isEditEnabled
								? 'bg-yellow-100 border-yellow-400 p-1 text-background'
								: 'border-transparent text-text/90'
						}
						`}
					>
						{description}
					</p>
				</div>
			</div>

			{/* Divider */}
			<div
				onClick={onClick}
				className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"
			/>

			{/* Difficulty Indicator */}
			<div className="flex items-center justify-between gap-1">
				<div
					className={`${isEditEnabled ? '' : 'flex-1'}`}
					onClick={isEditEnabled ? undefined : onClick}
				>
					<StarRating
						value={currentDifficulty}
						onChange={handleUpdateDifficulty}
						className={`transition-all duration-300 ease-in-out my-2 ${
							isEditEnabled
								? 'bg-yellow-100 gap-x-1 border-yellow-400 border-2 p-1 scale-125'
								: 'scale-100'
						}`}
						starClassName="w-3 h-3"
					/>
				</div>

				<div className="flex gap-x-3">
					<EditButton
						isEditEnabled={isEditEnabled}
						isEditing={isLoading}
						setIsEditEnabled={setIsEditEnabled}
						setIsEditing={setIsLoading}
						updateFn={handleSubjectUpdate}
					/>
					<DeleteWithConfirm
						deleteFn={handleDeleteConfirmed}
						setIsDeleting={setIsLoading}
					/>
				</div>
			</div>
		</div>
	);
}
