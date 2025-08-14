import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/Modal';
import StarRating from '../components/ui/StarRating';
import DeleteWithConfirm from '../components/ui/DeleteWithConfirm';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteSubject } from '../hooks/subject/useDeleteSubject';
import { useUpdateSubject } from '../hooks/subject/useUpdateSubject';
import { useSubjectStore_UI } from '../stores/subjectStore_UI';
import { SubjectRead } from '../../../services/api/schema/subject_schema';
import { FaSave } from 'react-icons/fa';
import { toast } from '../../../lib/toastify/charLimitedToast';

interface EditSubjectModalProps {
	subject?: SubjectRead;
}

export default function EditSubjectModal({ subject }: EditSubjectModalProps) {
	const activeModal = useSubjectStore_UI((state) => state.activeModal);

	const closeActiveModal = useSubjectStore_UI(
		(state) => state.closeActiveModal
	);

	if (!subject || activeModal !== 'EditSubjectModal') return null;
	return (
		<Modal
			isOpen={true}
			onClose={closeActiveModal}
			title="Edit this Subject!"
		>
			<UpdateSubjectSection
				subject={subject}
				handleCloseModal={closeActiveModal}
			/>
		</Modal>
	);
}

interface UpdateSubjectSection {
	subject: SubjectRead;
	handleCloseModal: () => void;
}

const UpdateSubjectSection = ({
	subject,
	handleCloseModal,
}: UpdateSubjectSection) => {
	const formRef = useRef<HTMLFormElement>(null);
	const subjectNameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const [difficulty, setDifficulty] = useState(subject.difficulty);

	const queryClient = useQueryClient();

	const deleteSubjectMutate = useDeleteSubject();

	const updateSubjectMutate = useUpdateSubject();

	const SUBJECTS_QUERY_KEY = ['players', subject.player_id, 'subjects'];

	const [isDeleting, setIsDeleting] = useState(false);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		updateSubjectMutate.mutate(
			{
				subjectId: subject.id,
				subjectUpdate: {
					code_name: subjectNameRef.current?.value ?? '',
					description: descriptionRef.current?.value ?? '',
					difficulty,
				},
			},
			{
				onSuccess() {
					queryClient.invalidateQueries({
						queryKey: ['players', subject.player_id, 'subjects'],
					});
					toast.success('Subject updated successfully', {
						toastId: 'subject-update-success',
					});
				},
				onSettled() {
					handleCloseModal();
				},
			}
		);
	};

	const handleDeleteConfirmed = async () => {
		await deleteSubjectMutate.mutateAsync({ subjectId: subject.id });

		if (!deleteSubjectMutate.isError) {
			await queryClient.invalidateQueries({
				queryKey: SUBJECTS_QUERY_KEY,
			});
			toast.success('Quest deleted successfully', {
				toastId: 'quest-delete-success',
			});
			handleCloseModal();
		}
	};

	useEffect(() => {
		if (subjectNameRef.current) {
			subjectNameRef.current.focus();
		}
	}, []);

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
					defaultValue={subject.code_name}
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
					defaultValue={subject.description}
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
					Priority
				</label>
				<StarRating
					value={difficulty}
					onChange={(rating: number) => setDifficulty(rating)}
					editable
					displayOnly={false}
				/>
			</div>

			<div className="flex justify-end w-full pt-4 gap-x-2">
				<DeleteWithConfirm
					label="Delete"
					deleteFn={handleDeleteConfirmed}
					setIsDeleting={setIsDeleting}
					className={`px-3 rounded-md bg-danger/20 border border-danger/50`}
					iconClassName="w-4 h-4 "
					confirmClassName="text-sm"
				/>
				<button
					type="submit"
					onClick={handleSubmit}
					className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent
												   border border-accent rounded-lg font-rpg text-sm items-center
												   transition-all duration-200 focus:outline-none flex gap-2
												   focus:ring-offset-background active:scale-95 hover:scale-100"
				>
					<FaSave className="w-4 h-4" />
					Save
				</button>
			</div>
		</form>
	);
};
