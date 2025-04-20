import { useEffect, useRef, useState } from 'react';
import { FaFloppyDisk, FaPenToSquare } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import {
	QuestRead,
	QuestUpdate,
} from '../../../../../services/api/schema/quest_schema';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteQuest } from '../../../hooks/useDeleteQuest';
import { useUpdateQuest } from '../../../hooks/useUpdateQuest';
import StarRating from '../../StarRating';
import DeleteWithConfirm from './DeleteWithConfirm';

const DELETE_CONFIRMATION_TIME = 3; // Semantic constant for delete confirmation timer

interface QuestCardProps {
	quest: QuestRead;
}

const putCursorToFront = (element: HTMLElement) => {
	const length = element.textContent?.length ?? 0;
	const range = document.createRange();
	const selection = window.getSelection();

	range.setStart(element.firstChild || element, length);

	range.collapse(true);
	selection?.removeAllRanges();
	selection?.addRange(range);
};

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
	const SUBJECT_QUESTS_QUERY_KEY = ['subjects', quest.subject_id, 'quests'];
	const [isLoading, setIsLoading] = useState(false);
	const [isEditEnabled, setIsEditEnabled] = useState(false);

	const descriptionRef = useRef<HTMLParagraphElement>(null);
	const [currentDifficulty, setCurrentDifficulty] = useState(
		quest.difficulty
	);

	const handleUpdateDifficulty = (rating: number) => {
		if (!isEditEnabled) return;

		setCurrentDifficulty(rating);
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
				/>
				<EditButton
					isEditEnabled={isEditEnabled}
					setIsEditEnabled={setIsEditEnabled}
					questId={quest.id}
					descriptionRef={descriptionRef}
					currentDifficulty={currentDifficulty}
					queryKey={SUBJECT_QUESTS_QUERY_KEY}
					setIsLoading={setIsLoading}
				/>
			</div>

			<hr className="flex-1 mt-4 border-text/50 " />

			<div className="flex justify-between transition-all duration-200 ease-in-out">
				<StarRating
					className={`transition-all duration-300 ease-in-out my-2 ${
						isEditEnabled
							? 'bg-yellow-100 border-yellow-400 border-2 p-1 scale-110'
							: 'scale-100'
					}`}
					onKeyDown={(e: React.KeyboardEvent) => {
						// toast.warn('natawag naman');
						if (e.key !== 'Escape') return;
						let prevented: boolean;
						if (descriptionRef.current) {
							prevented = preventEmptyElementUpdate(
								descriptionRef.current,
								'Description must not be empty',
								quest.description
							);
							setIsEditEnabled(prevented);
						}
					}}
					starClassName="mx-[1.5px] w-3 h-3"
					value={currentDifficulty}
					onChange={handleUpdateDifficulty}
				/>
				<DeleteWithConfirm
					quest={quest}
					setIsLoading={setIsLoading}
					queryKey={SUBJECT_QUESTS_QUERY_KEY}
				/>
			</div>
		</div>
	);
}

interface QuestInputsProps {
	quest: QuestRead;
	isEditEnabled: boolean;
	descriptionRef: React.RefObject<HTMLParagraphElement | null>;
}

export function QuestInputs({
	quest,
	isEditEnabled,
	descriptionRef,
}: QuestInputsProps) {
	useEffect(() => {
		if (isEditEnabled && descriptionRef.current) {
			putCursorToFront(descriptionRef.current);
			descriptionRef.current.focus();
		}
	}, [isEditEnabled]);

	const handleKeyDown = () => {};

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

interface EditButtonProps {
	test: string;
	isEditEnabled: boolean;
	setIsEditEnabled: (isEditEnabled: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;
	descriptionRef: React.RefObject<HTMLParagraphElement | null>;
	currentDifficulty: number;
	questId: number;
	queryKey: (string | number)[];
}

export function EditButton({
	isEditEnabled,
	setIsEditEnabled,
	setIsLoading,
	descriptionRef,
	currentDifficulty,
	questId,
	queryKey,
}: EditButtonProps) {
	const queryClient = useQueryClient();

	const updateQuestMutate = useUpdateQuest();

	const handleUpdateQuest = async () => {
		setIsLoading(true);
		await updateQuestMutate.mutateAsync({
			questId,
			questUpdate: {
				description: descriptionRef.current?.textContent ?? '',
				difficulty: currentDifficulty,
			},
		});

		if (!updateQuestMutate.isError) {
			queryClient.invalidateQueries({
				queryKey,
			});
			toast.success('Quest updated successfully', {
				toastId: 'quest-update-success',
			});
		}
		setIsLoading(false);
	};

	return (
		<div className="shrink-0">
			<button
				onClick={async () => {
					if (!isEditEnabled) {
						setIsEditEnabled(true);
						return;
					}

					await handleUpdateQuest();
					setIsEditEnabled(false);
				}}
				disabled={updateQuestMutate.isPending}
				className="mt-1 shrink-0"
			>
				{isEditEnabled ? (
					<FaFloppyDisk
						className="text-accent"
						onClick={handleUpdateQuest}
					/>
				) : (
					<FaPenToSquare />
				)}
			</button>
		</div>
	);
}
