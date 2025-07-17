import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/Modal';
import StarRating from '../components/ui/StarRating';
import { useCreateSubject } from '../hooks/subject/useCreateSubject';
import { useQueryClient } from '@tanstack/react-query';
import { useSubjectStore_UI } from '../stores/subjectStore_UI';

interface AddNewSubjectModalProps {
	playerId?: number;
}

export default function AddNewSubjectModal({
	playerId,
}: AddNewSubjectModalProps) {
	const activeModal = useSubjectStore_UI((state) => state.activeModal);

	const closeActiveModal = useSubjectStore_UI(
		(state) => state.closeActiveModal
	);

	useEffect(() => {
		if (codeNameRef.current) {
			codeNameRef.current.focus();
		}
	}, [activeModal]);

	const formRef = useRef<HTMLFormElement>(null);
	const codeNameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const [difficulty, setDifficulty] = useState(3);

	const queryClient = useQueryClient();
	const createSubjectMutate = useCreateSubject();

	if (!playerId || activeModal !== 'AddNewSubjectModal') return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(formRef?.current!);

		createSubjectMutate.mutate(
			{
				playerId: playerId,
				subjectCreate: {
					code_name: formData.get('codeName') as string,
					description: formData.get('description') as string,
					difficulty,
				},
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ['players', playerId, 'subjects'],
					});
				},
				onSettled: () => {
					closeActiveModal();
					formRef?.current?.reset();
				},
			}
		);
	};

	return (
		<Modal
			isOpen={true}
			onClose={closeActiveModal}
			title="Add a new subject!"
		>
			<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="codeName"
						className="block font-rpg text-accent text-sm"
					>
						Code Name
					</label>
					<input
						required
						name="codeName"
						type="text"
						ref={codeNameRef}
						className="w-full rounded-lg bg-secondary/50 border border-accent/30 p-2 
                                 text-text placeholder-text/50 focus:border-accent/60 focus:outline-none
                                 transition-colors"
						placeholder="Enter subject name..."
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="description"
						className="block font-rpg text-accent text-sm"
					>
						Description
					</label>
					<textarea
						required
						name="description"
						ref={descriptionRef}
						className="w-full rounded-lg bg-secondary/50 border border-accent/30 p-2 
                                 text-text placeholder-text/50 focus:border-accent/60 focus:outline-none
                                 transition-colors min-h-[100px] resize-none"
						placeholder="Describe your subject..."
					/>
					<div className="space-y-2">
						<label
							htmlFor="difficulty"
							className="block font-rpg text-accent text-sm"
						>
							Difficulty
						</label>
						<StarRating
							value={difficulty}
							onChange={(rating: number) => {
								setDifficulty(rating);
							}}
						/>
					</div>
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
						Create Subject
					</button>
				</div>
			</form>
		</Modal>
	);
}
