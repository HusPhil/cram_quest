import { useEffect, useRef, useState } from 'react';
import {
	FaEllipsisVertical,
	FaFloppyDisk,
	FaPenToSquare,
} from 'react-icons/fa6';
import { GiRoundStar } from 'react-icons/gi';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { QuestRead } from '../../../../../services/api/schema/quest_schema';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteQuest } from '../../../hooks/useDeleteQuest';
import { useUpdateQuest } from '../../../hooks/useUpdateQuest';
import StarRating from '../../StarRating';

const DELETE_CONFIRMATION_TIME = 3; // Semantic constant for delete confirmation timer

interface QuestCardProps {
	quest: QuestRead;
}

export default function QuestCard({ quest }: QuestCardProps) {
	const [isEditEnabled, setIsEditEnabled] = useState(false);
	const [isConfirming, setIsConfirming] = useState(false);

	const [currentDifficulty, setCurrentDifficulty] = useState(
		quest.difficulty
	);

	const [timer, setTimer] = useState(DELETE_CONFIRMATION_TIME);

	const queryClient = useQueryClient();
	const deleteQuestMutate = useDeleteQuest();
	const updateQuestMutate = useUpdateQuest();

	const descriptionRef = useRef<HTMLParagraphElement>(null);

	const SUBJECT_QUESTS_QUERY_KEY = ['subjects', quest.subject_id, 'quests'];

	useEffect(() => {
		if (isEditEnabled && descriptionRef.current) {
			const length = descriptionRef.current.textContent?.length ?? 0;
			const range = document.createRange();
			const selection = window.getSelection();

			range.setStart(
				descriptionRef.current.firstChild || descriptionRef.current,
				length
			);
			range.collapse(true);
			selection?.removeAllRanges();
			selection?.addRange(range);

			descriptionRef.current.focus();
		}
	}, [isEditEnabled]);

	useEffect(() => {
		if (!isConfirming) return;

		const interval = setInterval(() => {
			setTimer((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					setIsConfirming(false);
					setTimer(DELETE_CONFIRMATION_TIME);
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isConfirming]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault(); // prevents new line
			if (!descriptionRef.current) return;

			if (descriptionRef.current?.textContent === '') {
				toast.error("Description can't be empty");
				descriptionRef.current.textContent = 'My empty quest';
				return;
			}
			handleUpdateQuest();
			setIsEditEnabled(false);
			descriptionRef.current?.blur();
		} else if (e.key === 'Escape') {
			if (!descriptionRef.current) {
				return;
			}

			descriptionRef.current.textContent = quest.description;
			setCurrentDifficulty(quest.difficulty);
			setIsEditEnabled(false);
		}
	};

	const handleDeleteClick = () => {
		if (isConfirming) {
			handleDeleteConfirmed();
			setIsConfirming(false);
			setTimer(DELETE_CONFIRMATION_TIME);
		} else {
			setIsConfirming(true);
			setTimer(DELETE_CONFIRMATION_TIME);
		}
	};

	const handleDeleteConfirmed = () => {
		deleteQuestMutate.mutate(
			{ questId: quest.id },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: SUBJECT_QUESTS_QUERY_KEY,
					});
					toast.success('Quest deleted successfully');
				},
				onError: () => {
					toast.error('Failed to delete quest');
				},
			}
		);
	};

	const handleUpdateDifficulty = (rating: number) => {
		if (!isEditEnabled) return;

		setCurrentDifficulty(rating);
	};

	const handleUpdateQuest = async () => {
		await updateQuestMutate.mutateAsync({
			questId: quest.id,
			questUpdate: {
				difficulty: currentDifficulty,
				description: descriptionRef.current?.textContent ?? '',
			},
		});

		queryClient.invalidateQueries({
			queryKey: SUBJECT_QUESTS_QUERY_KEY,
		});

		toast.success('Quest updated successfully', {
			toastId: 'quest-update-success',
			onClose: () => {},
		});
	};

	return (
		<div
			className={`bg-secondary rounded-lg pt-3 pb-1 px-3 fade-in-on-view ${
				deleteQuestMutate.isPending || updateQuestMutate.isPending
					? 'opacity-30 pointer-events-none'
					: ''
			}`}
		>
			<div className="flex justify-between items-start ">
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
			</div>

			<hr className="flex-1 mt-2 border-text/50" />

			<div className="flex justify-between transition-all duration-200 ease-in-out">
				<div className="flex gap-2 items-center">
					<StarRating
						className={`transition-all duration-300 ease-in-out my-2 ${
							isEditEnabled
								? 'bg-yellow-100 border-yellow-400 border-2 p-1 scale-110'
								: 'scale-100'
						}`}
						starClassName="mx-[1.5px] w-3 h-3"
						onKeyDown={handleKeyDown}
						value={currentDifficulty}
						onChange={(rating: number) =>
							handleUpdateDifficulty(rating)
						}
						max={5}
					/>
				</div>
				<button
					className={`group px-1 flex items-center gap-1 text-xs 
								transition-width duration-300 ease-in-out
								${isConfirming ? 'text-primary px-3 py-1 mt-1' : ''}`}
					onClick={handleDeleteClick}
				>
					{isConfirming ? (
						<div className="flex items-center gap-2">
							<p className="text-primary px-3 py-1  bg-primary/20 rounded-md">{`Confirm (${timer}s)`}</p>
						</div>
					) : (
						<FaTrash className="w-3 h-3 text-primary/80" />
					)}
				</button>
			</div>
		</div>
	);
}
