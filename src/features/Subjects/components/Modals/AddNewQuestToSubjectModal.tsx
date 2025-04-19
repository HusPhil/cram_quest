import React, { useRef, useState } from 'react';
import Modal from '../../../../components/Modal';
import StarRating from '../StarRating';
// import { useCreateQuest } from '../../hooks/useCreateQuest';
import { useQueryClient } from '@tanstack/react-query';

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
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const [difficulty, setDifficulty] = useState(3);
	const [expReward, setExpReward] = useState(50); // Default EXP reward

	const queryClient = useQueryClient();
	// const createQuestMutate = useCreateQuest();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(formRef?.current!);

		// await createQuestMutate.mutateAsync({
		// 	subjectId: subjectId,
		// 	questCreate: {
		// 		title: formData.get('title') as string,
		// 		description: formData.get('description') as string,
		// 		difficulty,
		// 		exp_reward: expReward,
		// 	},
		// });

		// if (!createQuestMutate.isError) {
		// 	queryClient.invalidateQueries({
		// 		queryKey: ['subjects', subjectId, 'quests'],
		// 	});
		// 	setIsModalOpen(false);
		// }
		// formRef?.current?.reset();
	};

	return (
		<Modal
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			title="Forge a New Quest!"
		>
			<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="title"
						className="block font-rpg text-crystal-light text-sm"
					>
						Quest Title
					</label>
					<input
						required
						id="title"
						name="title"
						type="text"
						ref={titleRef}
						className="w-full rounded-lg bg-secondary/50 border-2 border-crystal-border p-2 
                                 text-text placeholder-text/50 focus:border-crystal-light focus:outline-none
                                 transition-all duration-200 hover:border-crystal-light/50"
						placeholder="Name your quest..."
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="description"
						className="block font-rpg text-crystal-light text-sm"
					>
						Quest Description
					</label>
					<textarea
						required
						id="description"
						name="description"
						ref={descriptionRef}
						className="w-full rounded-lg bg-secondary/50 border-2 border-crystal-border p-2 
                                 text-text placeholder-text/50 focus:border-crystal-light focus:outline-none
                                 transition-all duration-200 hover:border-crystal-light/50
                                 min-h-[120px] resize-none"
						placeholder="Detail your quest objectives..."
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<label
							htmlFor="difficulty"
							className="block font-rpg text-crystal-light text-sm"
						>
							Challenge Level
						</label>
						<StarRating
							value={difficulty}
							onChange={(rating: number) => setDifficulty(rating)}
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="expReward"
							className="block font-rpg text-crystal-light text-sm"
						>
							EXP Reward
						</label>
						<input
							type="number"
							id="expReward"
							name="expReward"
							value={expReward}
							onChange={(e) =>
								setExpReward(Number(e.target.value))
							}
							min="10"
							max="1000"
							step="10"
							className="w-full rounded-lg bg-secondary/50 border-2 border-crystal-border p-2 
                                     text-text placeholder-text/50 focus:border-crystal-light focus:outline-none
                                     transition-all duration-200 hover:border-crystal-light/50"
						/>
					</div>
				</div>

				<div className="flex justify-end pt-4">
					<button
						type="submit"
						className="px-6 py-3 bg-crystal-light/20 hover:bg-crystal-light/30 
                                 text-crystal-light border-2 border-crystal-light/50 
                                 rounded-lg font-rpg text-sm
                                 transition-all duration-200 
                                 hover:scale-105 active:scale-95 
                                 focus:outline-none focus:ring-2 
                                 focus:ring-crystal-light/50 
                                 focus:ring-offset-2 focus:ring-offset-background
                                 shadow-lg shadow-crystal-light/10"
					>
						Begin Quest
					</button>
				</div>
			</form>
		</Modal>
	);
}
