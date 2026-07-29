import React, { useRef, useState } from 'react';

import Modal from '../../../components/Modal';

import StarRating from '../components/ui/StarRating';

import DeleteWithConfirm from '../components/ui/DeleteWithConfirm';

import { useQueryClient } from '@tanstack/react-query';

import { useSubjectStore_UI } from '../stores/subjectStore_UI';

import {
	QuestRead,
	QuestStatus, // Assuming QuestStatus enum exists and includes 'todo', 'doing', 'done'
} from '../../../services/api/schema/quest_schema';

import { useUpdateQuest } from '../hooks/quest/useUpdateQuest';

import { TbSwords } from 'react-icons/tb';
import { useBattleSetupStore } from '../../Battle/stores/battleSetupStore';
import { FaSave } from 'react-icons/fa';
import { toast } from '../../../lib/toastify/charLimitedToast';

interface ViewQuestModalProps {
	quest?: QuestRead;
}

export default function ViewQuestModal({ quest: quest }: ViewQuestModalProps) {
	const activeModal = useSubjectStore_UI((state) => state.activeModal);

	const closeActiveModal = useSubjectStore_UI(
		(state) => state.closeActiveModal
	);

	if (!quest || activeModal !== 'ViewQuestModal') return null;
	return (
		<Modal
			isOpen={true}
			onClose={closeActiveModal}
			title="Ready for battle?"
		>
			<UpdateQuestSection
				quest={quest}
				handleCloseModal={closeActiveModal}
			/>
		</Modal>
	);
}

interface UpdateQuestSectionProps {
	quest: QuestRead;
	handleCloseModal: () => void;
}

const UpdateQuestSection = ({
	quest,
	handleCloseModal,
}: UpdateQuestSectionProps) => {
	const formRef = useRef<HTMLFormElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const [difficulty, setDifficulty] = useState(quest.difficulty);
	const [selectedCategory, setSelectedCategory] = useState<QuestStatus>(
		quest.status
	);

	const queryClient = useQueryClient();

	const updateQuestMutate = useUpdateQuest();

	const setActiveModal = useSubjectStore_UI((state) => state.setActiveModal);
	const selectQuest = useBattleSetupStore((state) => state.selectQuest);

	const SUBJECT_QUESTS_QUERY_KEY = ['subjects', quest.subject_id, 'quests'];

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		updateQuestMutate.mutate(
			{
				questId: quest.id,
				questUpdate: {
					description: descriptionRef.current?.value ?? '',
					difficulty,
					status: selectedCategory,
				},
			},
			{
				onSuccess() {
					queryClient.invalidateQueries({
						queryKey: SUBJECT_QUESTS_QUERY_KEY,
					});
					toast.success('Quest updated successfully', {
						toastId: 'quest-update-success',
					});
				},
				onSettled() {
					handleCloseModal();
				},
			}
		);
	};

	const handleArchiveQuest = async () => {
		updateQuestMutate.mutate(
			{
				questId: quest.id,
				questUpdate: {
					status: 'archive' as QuestStatus, // Assuming 'archive' is a valid QuestStatus or a custom value
				},
			},
			{
				onSuccess() {
					queryClient.invalidateQueries({
						queryKey: SUBJECT_QUESTS_QUERY_KEY,
					});
					toast.success('Quest deleted successfully!', {
						toastId: 'quest-deleted-success',
					}); // delete (actually archive) for now
				},
				onSettled() {
					handleCloseModal();
				},
			}
		);
	};

	const handleStartBattle = async () => {
		setActiveModal('StartBattleModal', { initialStep: 1 });
		selectQuest(quest);
	};

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className={`space-y-4 ${
				updateQuestMutate.isPending
					? 'pointer-events-none opacity-50'
					: ''
			}`}
		>
			<div className="space-y-2">
				<label
					htmlFor="description"
					className="block font-rpg text-accent text-sm"
				>
					Description
				</label>
				<textarea
					required
					id="description"
					name="description"
					defaultValue={quest.description}
					ref={descriptionRef}
					className="w-full rounded-lg bg-secondary/50 border border-accent/30 p-2
                                text-text placeholder-text/50 focus:border-accent/60 focus:outline-none
                                transition-colors min-h-[100px] resize-none"
					placeholder="Describe your subject..."
				/>
			</div>

			<div className="flex gap-4 flex-col">
				<div className="">
					<label
						htmlFor="status"
						className="block font-rpg text-accent text-sm mb-2"
					>
						Status
					</label>
					{/* Replaced select with iconed radio buttons */}
					<div className="flex flex-wrap gap-2 ">
						{/* Todo Status */}
						<label
							className={`flex gap-2 items-center justify-center py-2 px-3 rounded-lg cursor-pointer
                                       border transition-colors duration-200
                                       ${
											selectedCategory === 'todo'
												? 'bg-accent/30 border-accent text-accent'
												: 'bg-secondary/50 border-accent/30 text-text hover:bg-secondary/70'
										}`}
						>
							<input
								type="radio"
								name="status"
								value="todo"
								checked={selectedCategory === 'todo'}
								onChange={() => setSelectedCategory('todo')}
								className="hidden" // Hide the default radio button
							/>

							<span className="font-rpg text-sm">Todo</span>
						</label>

						{/* Doing Status */}
						<label
							className={`flex gap-2 items-center justify-center py-2 px-3 rounded-lg cursor-pointer
                                       border transition-colors duration-200
                                       ${
											selectedCategory === 'doing'
												? 'bg-accent/30 border-accent text-accent'
												: 'bg-secondary/50 border-accent/30 text-text hover:bg-secondary/70'
										}`}
						>
							<input
								type="radio"
								name="status"
								value="doing"
								checked={selectedCategory === 'doing'}
								onChange={() => setSelectedCategory('doing')}
								className="hidden"
							/>

							<span className="font-rpg text-sm">Doing</span>
						</label>

						{/* Done Status */}
						<label
							className={`flex gap-2 items-center justify-center py-2 px-3 rounded-lg cursor-pointer
                                       border transition-colors duration-200
                                       ${
											selectedCategory === 'done'
												? 'bg-accent/30 border-accent text-accent'
												: 'bg-secondary/50 border-accent/30 text-text hover:bg-secondary/70'
										}`}
						>
							<input
								type="radio"
								name="status"
								value="done"
								checked={selectedCategory === 'done'}
								onChange={() => setSelectedCategory('done')}
								className="hidden"
							/>

							<span className="font-rpg text-sm">Done</span>
						</label>
					</div>
				</div>
				<div className="flex flex-col justify-between">
					<label
						htmlFor="difficulty"
						className="block font-rpg text-accent text-sm mb-2"
					>
						Difficulty
					</label>
					<StarRating
						className="mb-3"
						value={difficulty}
						onChange={(rating: number) => setDifficulty(rating)}
						editable
						displayOnly={false}
					/>
				</div>
			</div>

			{/* Responsive Button Layout */}
			<div
				className={`flex flex-col gap-y-3 ${
					updateQuestMutate.isPending
						? 'pointer-events-none opacity-50'
						: ''
				}`}
			>
				{/* Save Changes, Delete, and Archive buttons group */}
				<div className="flex gap-x-2 justify-end">
					<DeleteWithConfirm
						deleteFn={handleArchiveQuest}
						className={`px-3 rounded-md bg-danger/20 border border-danger/50 flex`}
						iconClassName="w-4 h-4 "
						confirmClassName="text-sm"
						label="Delete"
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent
                                   border border-accent rounded-lg font-rpg text-sm 
                                   transition-all duration-200 focus:outline-none flex items-center gap-2
                                   focus:ring-offset-background active:scale-95 hover:scale-100"
					>
						<FaSave className="w-4 h-4" />
						<p>Save</p>
					</button>
				</div>

				{/* Start Battle! button - always full width at the bottom */}
				<button
					disabled={
						quest.status === 'done' || updateQuestMutate.isPending
					}
					type="button"
					onClick={handleStartBattle}
					className="w-full py-2 bg-accent disabled:opacity-50 disabled:cursor-not-allowed
                               rounded-lg text-background
                               transition-all duration-200 active:scale-95
                               flex items-center justify-center gap-2"
				>
					<TbSwords className="w-5 h-5 font-bold" />
					Start Battle!
				</button>
			</div>
		</form>
	);
};
