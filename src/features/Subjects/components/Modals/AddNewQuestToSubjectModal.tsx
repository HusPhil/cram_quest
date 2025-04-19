import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../../components/Modal';
import StarRating from '../StarRating';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateQuest } from '../../hooks/useCreateQuest';

interface AddNewQuestToSubjectModalProps {
	subjectId: number;
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
}

export default function AddNewQuestToSubjectModal({
	subjectId,
	isModalOpen,
	setIsModalOpen,
}: AddNewQuestToSubjectModalProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isModalOpen && descriptionRef.current) {
			descriptionRef.current.focus();
		}
	}, [isModalOpen]);

	const [difficulty, setDifficulty] = useState(3);

	const queryClient = useQueryClient();
	const createQuestMutate = useCreateQuest();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(formRef?.current!);

		const questCreate = {
			subject_id: subjectId,
			difficulty,
			description: formData.get('description') as string,
			status: 'in_progress',
		};

		console.log('questCreate', questCreate);

		await createQuestMutate.mutateAsync({
			questCreate: questCreate,
		});

		if (!createQuestMutate.isError) {
			setIsModalOpen(false);
			queryClient.invalidateQueries({
				queryKey: ['subjects', subjectId, 'quests'],
			});
		}
		formRef?.current?.reset();
	};

	return (
		<Modal
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
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
						className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent 
								 border border-accent rounded-lg font-rpg text-sm
								 transition-all duration-200 focus:outline-none
								 focus:ring-offset-background
								 active:scale-95 hover:scale-100"
					>
						Begin Quest
					</button>
				</div>
			</form>
		</Modal>
	);
}
