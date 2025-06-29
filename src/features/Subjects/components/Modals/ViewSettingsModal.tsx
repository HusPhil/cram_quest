import React, { useRef, useState } from 'react';
import Modal from '../../../../components/Modal';
import StarRating from '../StarRating';
import DeleteWithConfirm from '../Pages/Quest/DeleteWithConfirm';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteQuest } from '../../hooks/useDeleteQuest';
import { useDeleteSubject } from '../../hooks/useDeleteSubject';
import { toast } from 'react-toastify';
import { useUpdateSubject } from '../../hooks/useUpdateSubject';
import { Update } from 'vite/types/hmrPayload.js';

export type InitialSettingConfig = {
	codeName: string;
	description: string;
	difficulty: number;
};

interface ViewSettingsModalProps {
	subjectId: number;
	playerId: number;
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
	initialSettingConfig: InitialSettingConfig;
}

export default function ViewSettingsModal({
	subjectId,
	playerId,
	initialSettingConfig,
	isModalOpen,
	setIsModalOpen,
}: ViewSettingsModalProps) {
	if (!isModalOpen) return null;

	return (
		<Modal
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			title="Subject Settings"
		>
			<UpdateSubjectSection
				playerId={playerId}
				subjectId={subjectId}
				initialSettingConfig={initialSettingConfig}
				setIsModalOpen={setIsModalOpen}
			/>
		</Modal>
	);
}

interface UpdateSubjectSection {
	playerId: number;
	subjectId: number;
	initialSettingConfig: InitialSettingConfig;
	setIsModalOpen: (open: boolean) => void;
}

const UpdateSubjectSection = ({
	playerId,
	subjectId,
	initialSettingConfig,
	setIsModalOpen,
}: UpdateSubjectSection) => {
	const formRef = useRef<HTMLFormElement>(null);
	const subjectNameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const [difficulty, setDifficulty] = useState(
		initialSettingConfig.difficulty
	);

	const queryClient = useQueryClient();

	const deleteSubjectMutate = useDeleteSubject();

	const updateSubjectMutate = useUpdateSubject();

	const SUBJECTS_QUERY_KEY = ['players', playerId, 'subjects'];

	const [isDeleting, setIsDeleting] = useState(false);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		updateSubjectMutate.mutate(
			{
				subjectId,
				subjectUpdate: {
					code_name: subjectNameRef.current?.value ?? '',
					description: descriptionRef.current?.value ?? '',
					difficulty,
				},
			},
			{
				onSuccess(data, variables, context) {
					queryClient.invalidateQueries({
						queryKey: ['players', playerId, 'subjects'],
					});
					toast.success('Subject updated successfully');
				},
				onSettled(data, error, variables, context) {
					setIsModalOpen(false);
				},
			}
		);
	};

	const handleDeleteConfirmed = async () => {
		await deleteSubjectMutate.mutateAsync({ subjectId });

		if (!deleteSubjectMutate.isError) {
			queryClient.invalidateQueries({
				queryKey: SUBJECTS_QUERY_KEY,
			});
			toast.success('Quest deleted successfully');
		}
	};

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className={`space-y-4 ${
				isDeleting ? 'pointer-events-none opacity-50' : ''
			}`}
		>
			<div className="space-y-2">
				<label
					htmlFor="subjectName"
					className="block font-rpg text-accent text-sm"
				>
					Subject Name
				</label>
				<input
					required
					type="text"
					id="subjectName"
					name="subjectName"
					defaultValue={initialSettingConfig.codeName}
					ref={subjectNameRef}
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
					id="description"
					name="description"
					defaultValue={initialSettingConfig.description}
					ref={descriptionRef}
					className="w-full rounded-lg bg-secondary/50 border border-accent/30 p-2 
							 text-text placeholder-text/50 focus:border-accent/60 focus:outline-none
							 transition-colors min-h-[100px] resize-none"
					placeholder="Describe your subject..."
				/>
			</div>

			<div className="space-y-2">
				<label
					htmlFor="difficulty"
					className="block font-rpg text-accent text-sm"
				>
					Difficulty
				</label>
				<StarRating
					value={difficulty}
					onChange={(rating: number) => setDifficulty(rating)}
				/>
			</div>

			<div className="flex justify-end w-full pt-4 gap-x-2">
				<DeleteWithConfirm
					deleteFn={handleDeleteConfirmed}
					setIsDeleting={setIsDeleting}
					className={`px-3 rounded-md bg-danger/20 border border-danger/50`}
					iconClassName="w-4 h-4 "
					confirmClassName="text-sm"
				/>
				<button
					// type="submit"
					type="button"
					onClick={handleSubmit}
					className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent 
							 border border-accent rounded-lg font-rpg text-sm
							 transition-all duration-200 focus:outline-none
							 focus:ring-offset-background
							 active:scale-95 hover:scale-100"
				>
					Save Changes
				</button>
			</div>
		</form>
	);
};
