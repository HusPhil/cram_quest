import React, { useState } from 'react';
import Modal from '../../../../components/Modal';
import StarRating from '../StarRating';

export default function AddNewSubjectModal({
	isModalOpen,
	setIsModalOpen,
}: {
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
}) {
	const [formData, setFormData] = useState({
		codeName: '',
		description: '',
	});

	const [difficulty, setDifficulty] = useState(3);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log(formData);
	};

	return (
		<Modal
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			title="Add a new subject!"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="codeName"
						className="block font-rpg text-accent text-sm"
					>
						Code Name
					</label>
					<input
						id="codeName"
						type="text"
						value={formData.codeName}
						onChange={(e) =>
							setFormData({
								...formData,
								codeName: e.target.value,
							})
						}
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
						id="description"
						value={formData.description}
						onChange={(e) =>
							setFormData({
								...formData,
								description: e.target.value,
							})
						}
						className="w-full rounded-lg bg-secondary/50 border border-accent/30 p-2 
                                 text-text placeholder-text/50 focus:border-accent/60 focus:outline-none
                                 transition-colors min-h-[100px] resize-none"
						placeholder="Describe your subject..."
					/>
					<div className="space-y-2">
						<label
							htmlFor="description"
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
