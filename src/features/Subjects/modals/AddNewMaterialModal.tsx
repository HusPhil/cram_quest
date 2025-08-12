import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/Modal';
import { useCreateMaterial } from '../hooks/material/useCreateMaterial';
import { useQueryClient } from '@tanstack/react-query';
import { MaterialType } from '../screens/SubjectScreen/Tabs/LearningPage';
import { useSubjectStore_UI } from '../stores/subjectStore_UI';
import { TbBrandYoutube, TbCreditCard, TbNote } from 'react-icons/tb';

interface AddNewMaterialModalProps {
	subjectId: number;
}

type MaterialOption = {
	type: MaterialType;
	label: string;
	icon: React.ReactNode;
};

export default function AddNewMaterialModal({
	subjectId,
}: AddNewMaterialModalProps) {
	const closeActiveModal = useSubjectStore_UI(
		(state) => state.closeActiveModal
	);

	const formRef = useRef<HTMLFormElement>(null);
	const codeNameRef = useRef<HTMLInputElement>(null);
	const linkRef = useRef<HTMLInputElement>(null);

	const [selectedType, setSelectedType] = useState<MaterialType>('Video'); // default

	const queryClient = useQueryClient();
	const createMaterialMutate = useCreateMaterial();

	const activeModal = useSubjectStore_UI((state) => state.activeModal);

	useEffect(() => {
		if (codeNameRef.current) {
			console.log('subjectId:', subjectId);
			codeNameRef.current.focus();
		}
	}, [activeModal]);

	if (!subjectId || activeModal !== 'AddNewMaterialModal') return null;

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

		const materialCreate = {
			title: formData.get('newMaterialTitle') as string,
			link: formData.get('materialLink') as string,
			type: selectedType,
		};

		createMaterialMutate.mutate(
			{
				subjectId,
				materialCreate,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ['players', subjectId, 'materials'],
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
			title="Add a new material!"
		>
			<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
						type="text"
						ref={codeNameRef}
						className="w-full rounded-lg bg-secondary/50 border border-accent/30 p-2 
                                 text-text placeholder-text/50 focus:border-accent/60 focus:outline-none
                                 transition-colors"
						placeholder="Enter material title…"
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
						type="text"
						ref={linkRef}
						className="w-full rounded-lg bg-secondary/50 border border-accent/30 p-2 
                                 text-text placeholder-text/50 focus:border-accent/60 focus:outline-none
                                 transition-colors"
						placeholder="Enter material link…"
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="materialType"
						className="block font-rpg text-accent text-sm"
					>
						Type
					</label>
					<div className="flex gap-2">
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

				<div className="flex justify-end pt-4">
					<button
						type="submit"
						className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent 
                        border border-accent rounded-lg font-rpg text-sm
                        transition-all duration-200 focus:outline-none
                         focus:ring-offset-background
                        active:scale-95 hover:scale-100"
					>
						Add New Material
					</button>
				</div>
			</form>
		</Modal>
	);
}
