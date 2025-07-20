import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/Modal';
import StarRating from '../components/ui/StarRating';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateQuest } from '../hooks/quest/useCreateQuest';
import { useSubjectStore_UI } from '../stores/subjectStore_UI';
import { QuestStatus } from '../../../services/api/schema/quest_schema';

interface AddNewQuestModalProps {
	subjectId: number;
}

export default function AddNewQuestModal({ subjectId }: AddNewQuestModalProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

	const closeActiveModal = useSubjectStore_UI(
		(state) => state.closeActiveModal
	);

	const [difficulty, setDifficulty] = useState(3);

	const queryClient = useQueryClient();
	const createQuestMutate = useCreateQuest();

	const activeModal = useSubjectStore_UI((state) => state.activeModal);

	useEffect(() => {
		if (descriptionRef.current) {
			descriptionRef.current.focus();
		}
	}, [activeModal]);

	if (!subjectId || activeModal !== 'AddNewQuestModal') return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(formRef?.current!);

		const questCreate = {
			subject_id: subjectId,
			difficulty,
			description: formData.get('description') as string,
			status: 'to_do' as QuestStatus,
		};

		console.log('questCreate', questCreate);

		await createQuestMutate.mutateAsync({
			questCreate: questCreate,
		});

		if (!createQuestMutate.isError) {
			closeActiveModal();
			await queryClient.invalidateQueries({
				queryKey: ['subjects', subjectId, 'quests'],
			});
		}
		formRef?.current?.reset();
	};
	return (
		<Modal
			isOpen={true}
			onClose={closeActiveModal}
			title="Add a new Quest!"
		>
			<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="description"
						className="block font-rpg text-accent text-sm"
					>
						Quest description
					</label>
					<input
						required
						id="description"
						name="description"
						type="text"
						ref={descriptionRef}
						className="w-full rounded-lg bg-secondary/50 border border-accent/30 p-2 
								 text-text placeholder-text/50 focus:border-accent/60 focus:outline-none
								 transition-colors"
						placeholder="Create flashcards..."
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="difficulty"
						className="block font-rpg text-accent text-sm"
					>
						Challenge Level
					</label>
					<StarRating
						value={difficulty}
						onChange={(rating: number) => setDifficulty(rating)}
					/>
				</div>

				<div className="flex justify-end pt-4">
					<button
						type="submit"
						disabled={createQuestMutate.isPending}
						className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent 
								 border border-accent rounded-lg font-rpg text-sm
								 transition-all duration-200 focus:outline-none
								 focus:ring-2 focus:ring-accent/50 focus:ring-offset-background
								 focus:bg-accent/40
								 disabled:opacity-50 disabled:cursor-not-allowed 
								 active:scale-95 hover:scale-100"
					>
						{createQuestMutate.isPending
							? 'Creating...'
							: 'Create Quest'}
					</button>
				</div>
			</form>
		</Modal>
	);
}
