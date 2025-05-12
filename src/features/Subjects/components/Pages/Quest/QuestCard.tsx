import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { QuestRead } from '../../../../../services/api/schema/quest_schema';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteQuest } from '../../../hooks/useDeleteQuest';
import { useUpdateQuest } from '../../../hooks/useUpdateQuest';
import StarRating from '../../StarRating';
import DeleteWithConfirm from './DeleteWithConfirm';
import EditButton from './EditButton';
import { putCursorToFront } from '../../../../../utils/putCursorToFront';

interface QuestCardProps {
	quest: QuestRead;
}

const preventEmptyElementUpdate = (
	element: HTMLElement,
	toastMessage?: string,
	revertContent?: string
): boolean => {
	if (element?.textContent !== '') {
		return false;
	}

	element.textContent = revertContent || 'My empty quest';

	if (toastMessage) {
		toast.error("Description can't be empty");
	}

	return true;
};

export default function QuestCard({ quest }: QuestCardProps) {
	const queryClient = useQueryClient();

	const SUBJECT_QUESTS_QUERY_KEY = ['subjects', quest.subject_id, 'quests'];

	const [isLoading, setIsLoading] = useState(false);
	const [isEditEnabled, setIsEditEnabled] = useState(false);

	const descriptionRef = useRef<HTMLParagraphElement>(null);
	const [currentDifficulty, setCurrentDifficulty] = useState(
		quest.difficulty
	);

	const deleteQuestMutate = useDeleteQuest();
	const updateQuestMutate = useUpdateQuest();

	const handleUpdateDifficulty = (rating: number) => {
		if (!isEditEnabled) return;

		setCurrentDifficulty(rating);
	};

	const handleDeleteConfirmed = async () => {
		await deleteQuestMutate.mutateAsync({ questId: quest.id });

		if (!deleteQuestMutate.isError) {
			queryClient.invalidateQueries({
				queryKey: SUBJECT_QUESTS_QUERY_KEY,
			});
			toast.success('Quest deleted successfully');
		}
	};

	const handleQuestUpdate = async () => {
		await updateQuestMutate.mutateAsync({
			questId: quest.id,
			questUpdate: {
				description: descriptionRef.current?.textContent ?? '',
				difficulty: currentDifficulty,
			},
		});

		if (!updateQuestMutate.isError) {
			queryClient.invalidateQueries({
				queryKey: SUBJECT_QUESTS_QUERY_KEY,
			});
			toast.success('Quest updated successfully', {
				toastId: 'quest-update-success-' + quest.id,
			});
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			let prevented: boolean;
			if (!descriptionRef.current) return;

			prevented = preventEmptyElementUpdate(
				descriptionRef.current,
				'Description must not be empty'
			);

			// revert previous content
			descriptionRef.current.textContent = quest.description;
			setCurrentDifficulty(quest.difficulty);

			setIsEditEnabled(prevented);
		} else if (e.key === 'Enter') {
			handleQuestUpdate();
			setIsEditEnabled(false);
		}
	};

	return (
		<div
			className={`bg-secondary rounded-lg pt-3 pb-1 px-3 fade-in-on-view ${
				isLoading ? 'opacity-30 pointer-events-none' : ''
			}`}
		>
			<div className="flex justify-between items-start ">
				<QuestInputs
					quest={quest}
					descriptionRef={descriptionRef}
					isEditEnabled={isEditEnabled}
					handleKeyDown={handleKeyDown}
				/>
				<EditButton
					isEditEnabled={isEditEnabled}
					isEditing={isLoading}
					setIsEditEnabled={setIsEditEnabled}
					setIsEditing={setIsLoading}
					updateFn={handleQuestUpdate}
				/>
			</div>

			<hr className="flex-1 mt-4 border-text/50 " />

			<div className="flex justify-between items-center transition-all duration-200 ease-in-out">
				<StarRating
					className={`transition-all duration-300 ease-in-out my-2 ${
						isEditEnabled
							? 'bg-yellow-100 border-yellow-400 border-2 p-1 scale-110'
							: 'scale-100'
					}`}
					onKeyDown={handleKeyDown}
					starClassName="mx-[1.5px] w-3 h-3"
					value={currentDifficulty}
					onChange={handleUpdateDifficulty}
				/>
				<DeleteWithConfirm
					setIsDeleting={setIsLoading}
					deleteFn={handleDeleteConfirmed}
					className="mt-1"
					confirmClassName={`bg-primary/20 p-1 text-xs`}
				/>
			</div>
		</div>
	);
}

interface QuestInputsProps {
	quest: QuestRead;
	isEditEnabled: boolean;
	descriptionRef: React.RefObject<HTMLParagraphElement | null>;
	handleKeyDown: (e: React.KeyboardEvent) => void;
}

export function QuestInputs({
	quest,
	isEditEnabled,
	descriptionRef,
	handleKeyDown,
}: QuestInputsProps) {
	useEffect(() => {
		if (isEditEnabled && descriptionRef.current) {
			putCursorToFront(descriptionRef.current);
			descriptionRef.current.focus();
		}
	}, [isEditEnabled]);

	return (
		<div className="flex gap-3 items-start grow-0 max-w-[92%]">
			<input
				type="checkbox"
				className="appearance-none shrink-0 w-4 h-4 rounded-sm accent-accent 
		  bg-secondary checked:appearance-auto border border-accent mt-1"
			/>
			<p
				ref={descriptionRef}
				contentEditable={isEditEnabled}
				suppressContentEditableWarning
				onKeyDown={handleKeyDown}
				className={`overflow-hidden 
			${
				isEditEnabled
					? 'bg-yellow-100 border-yellow-400 text-background'
					: 'border-transparent'
			} 
			break-words`}
			>
				{quest.description}
			</p>
		</div>
	);
}
