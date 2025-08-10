import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/Modal';
import { useCreateMaterial } from '../hooks/material/useCreateMaterial';
import { useQueryClient } from '@tanstack/react-query';
import { FaCirclePlay, FaNoteSticky, FaRug } from 'react-icons/fa6';
import { MaterialType } from '../screens/SubjectScreen/Tabs/LearningPage';
import { MaterialRead } from '../../../services/api/schema/material_schema';
import { useSubjectStore_UI } from '../stores/subjectStore_UI';
import DeleteWithConfirm from '../components/ui/DeleteWithConfirm';
import { FaSave } from 'react-icons/fa';
import { TbBrandYoutube, TbCreditCard, TbNote } from 'react-icons/tb';
import { useUpdateMaterial } from '../hooks/material/useUpdateMaterial';
import { useDeleteMaterial } from '../hooks/material/useDeleteMaterial';

export type InitialSettingConfig = {
	newMaterialTitle: string;
	materialLink: string;
	materialType: string;
};

interface EditMaterialModalProps {
	material: MaterialRead | undefined;
}

export default function EditMaterialModal({
	material,
}: EditMaterialModalProps) {
	const closeActiveModal = useSubjectStore_UI(
		(state) => state.closeActiveModal
	);

	const formRef = useRef<HTMLFormElement>(null);
	const codeNameRef = useRef<HTMLInputElement>(null);
	const linkRef = useRef<HTMLInputElement>(null);

	const [selectedType, setSelectedType] = useState<MaterialType>('Video'); // default
	const [isInitialized, setIsInitialized] = useState(false);

	if (!isInitialized && material) {
		setSelectedType(material.type);
		setIsInitialized(true);
	}

	const queryClient = useQueryClient();
	const updateMaterialMutate = useUpdateMaterial();
	const deleteMaterialMutate = useDeleteMaterial();

	const activeModal = useSubjectStore_UI((state) => state.activeModal);

	useEffect(() => {
		if (codeNameRef.current) {
			codeNameRef.current.focus();
		}
	}, [activeModal]);

	if (!material || activeModal !== 'EditMaterialModal') return null;

	type MaterialOption = {
		type: MaterialType;
		label: string;
		icon: React.ReactNode;
	};

	const materialOptions: MaterialOption[] = [
		{
			type: 'Video',
			label: 'Video',
			icon: <TbBrandYoutube className="w-7 h-7" />,
		},
		{
			type: 'Note',
			label: 'Note',
			icon: <TbNote className="w-7 h-7" />,
		},
		{
			type: 'Flashcard',
			label: 'Flashcards',
			icon: <TbCreditCard className="w-7 h-7" />,
		},
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(formRef?.current!);

		console.log('Title:', formData.get('newMaterialTitle'));
		console.log('Link:', formData.get('materialLink'));
		console.log('Type:', selectedType);

		const materialUpdate = {
			title: formData.get('newMaterialTitle') as string,
			link: formData.get('materialLink') as string,
			type: selectedType,
		};

		updateMaterialMutate.mutate(
			{
				subjectId: material?.subject_id,
				materialId: material?.id,
				materialUpdate,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [
							'players',
							material?.subject_id,
							'materials',
						],
					});
				},
				onSettled: () => {
					closeActiveModal();
					formRef?.current?.reset();
				},
			}
		);
	};

	const handleDelete = async () => {
		deleteMaterialMutate.mutate(
			{
				subjectId: material.subject_id,
				materialId: material.id,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ['players', material.subject_id, 'materials'],
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
			onClose={() => {
				closeActiveModal();
				setIsInitialized(false); // reset tracker so next open reinitializes
			}}
			title="Edit material!"
		>
			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className={`space-y-4 ${
					deleteMaterialMutate.isPending
						? 'opacity-50 pointer-events-none'
						: ''
				}`}
			>
				<div className="space-y-2">
					<label
						htmlFor="newMaterialTitle"
						className="block font-rpg text-accent text-sm"
					>
						Title
					</label>
					<input
						id="newMaterialTitle"
						required
						name="newMaterialTitle"
						defaultValue={material?.title}
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
						htmlFor="materialLink"
						className="block font-rpg text-accent text-sm"
					>
						Link
					</label>
					<input
						id="materialLink"
						required
						name="materialLink"
						defaultValue={material?.link}
						type="text"
						ref={linkRef}
						className="w-full rounded-lg bg-secondary/50 border border-accent/30 p-2 
                                 text-text placeholder-text/50 focus:border-accent/60 focus:outline-none
                                 transition-colors"
						placeholder="Enter subject name..."
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="materialType"
						className="block font-rpg text-accent text-sm"
					>
						Type
					</label>
					<div className="flex gap-2 ">
						{materialOptions.map(({ type, label, icon }) => (
							<label
								key={type}
								className={`flex items-center gap-2 cursor-pointer py-2 px-4 rounded-md transition-colors
									${selectedType === type ? 'bg-accent/10 text-accent' : 'text-gray-500'}
								`}
								onClick={() => setSelectedType(type)}
							>
								<input
									type="radio"
									name="materialType"
									value={type}
									checked={selectedType === type}
									onChange={() => setSelectedType(type)}
									className="hidden"
								/>
								<span className="flex items-center gap-2 text-sm capitalize">
									<span
										className={`flex items-center justify-center
										${
											selectedType === type
												? 'border-accent text-accent'
												: 'border-gray-300 text-gray-500'
										}`}
									>
										{icon}
									</span>
									<span>{label}</span>
								</span>
							</label>
						))}
					</div>
				</div>

				<div className="flex justify-end pt-4 gap-2">
					<DeleteWithConfirm
						label="Delete"
						deleteFn={handleDelete}
						className={`px-3 rounded-md bg-danger/20 border border-danger/50`}
						iconClassName="w-4 h-4"
						confirmClassName="text-sm"
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent
								border border-accent rounded-lg font-rpg text-sm items-center
								transition-all duration-200 focus:outline-none flex gap-2
								focus:ring-offset-background active:scale-95 hover:scale-100"
					>
						<FaSave className="w-4 h-4" />
						<p>Save</p>
					</button>
				</div>
			</form>
		</Modal>
	);
}
