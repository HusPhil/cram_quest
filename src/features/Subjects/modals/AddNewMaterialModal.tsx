import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/Modal';
import { useCreateMaterial } from '../hooks/useCreateMaterial';
import { useQueryClient } from '@tanstack/react-query';
import { FaCirclePlay, FaNoteSticky, FaRug } from 'react-icons/fa6';
import { MaterialType } from '../screens/SubjectScreen/Tabs/Learning/LearningPage';

interface AddNewMaterialModalProps {
	subjectId: number;
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
}

export default function AddNewMaterialModal({
	subjectId,
	isModalOpen,
	setIsModalOpen,
}: AddNewMaterialModalProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const codeNameRef = useRef<HTMLInputElement>(null);
	const linkRef = useRef<HTMLInputElement>(null);

	const [selectedType, setSelectedType] = useState<MaterialType>('Video'); // default

	const queryClient = useQueryClient();
	const createMaterialMutate = useCreateMaterial();

	type MaterialOption = {
		type: MaterialType;
		label: string;
		icon: React.ReactNode;
	};

	const materialOptions: MaterialOption[] = [
		{
			type: 'Video',
			label: 'Video',
			icon: <FaCirclePlay className="w-4 h-4" />,
		},
		{
			type: 'Note',
			label: 'Note',
			icon: <FaNoteSticky className="w-4 h-4" />,
		},
		{
			type: 'Flashcard',
			label: 'Flashcards',
			icon: <FaRug className="w-4 h-4" />,
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
					setIsModalOpen(false);
					formRef?.current?.reset();
				},
			}
		);
	};

	useEffect(() => {
		if (codeNameRef.current) {
			console.log('subjectId:', subjectId);
			codeNameRef.current.focus();
		}
	}, [isModalOpen]);

	return (
		<Modal
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			title="Add a new material!"
		>
			<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="newMaterialTitle"
						className="block font-rpg text-accent text-sm"
					>
						Material Title
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
						Material Type
					</label>
					<div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-10">
						{materialOptions.map(({ type, label, icon }) => (
							<label
								key={type}
								className="flex items-center gap-2 cursor-pointer"
							>
								<input
									type="radio"
									name="materialType"
									value={type}
									checked={selectedType === type}
									onChange={() => setSelectedType(type)}
									className="accent-accent"
								/>
								<span className="flex items-center gap-1 text-text text-sm capitalize">
									<span
										className={`rounded-full p-0.5 border w-6 h-6 flex items-center justify-center text-base ${
											selectedType === type
												? 'border-accent text-accent'
												: 'border-gray-300 text-gray-500'
										}`}
									>
										{icon}
									</span>
									{label}
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
