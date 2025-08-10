import { useCallback } from 'react';
import TagLabel from '../../../../components/TagLabel';
import {
	FaCirclePlay,
	FaEllipsisVertical,
	FaNoteSticky,
	FaRug,
} from 'react-icons/fa6';
import { MaterialType } from '../../screens/SubjectScreen/Tabs/LearningPage';
import { MaterialRead } from '../../../../services/api/schema/material_schema';
import { useSubjectStore_UI } from '../../stores/subjectStore_UI';
import { TbBrandYoutube, TbCreditCard, TbNote } from 'react-icons/tb';

interface LearningMaterialCardProps {
	material: MaterialRead;
	subjectId: number;
}

export default function LearningMaterialCard({
	material,
}: LearningMaterialCardProps) {
	const setActiveModal = useSubjectStore_UI((state) => state.setActiveModal);

	const getIconFromMaterialType = useCallback((type: MaterialType) => {
		switch (type) {
			case 'Note':
				return <TbNote className="w-7 h-7 text-background" />;
			case 'Video':
				return <TbBrandYoutube className="w-7 h-7 text-background" />;
			case 'Flashcard':
				return <TbCreditCard className="w-7 h-7 text-background" />;
			default:
				return null;
		}
	}, []);

	return (
		<div
			title={material.title}
			onClick={() => {
				window.open(material.link, '_blank');
			}}
			className="fade-in-on-view mx-2 flex items-center gap-2 py-3 justify-between bg-secondary border-white/10 border p-3 rounded-md lg:hover:opacity-50 transition-all duration-300 hover:cursor-pointer"
		>
			<div className="flex items-center gap-3">
				<div className="rounded-md bg-accent p-2">
					{getIconFromMaterialType(material.type as MaterialType)}
				</div>
				<div className="flex flex-col gap-1 justify-center">
					<p className="line-clamp-1 text-sm">{material.title}</p>
					<small className="text-text/40 text-xs">{`${material.type} `}</small>
				</div>
			</div>
			<button
				className="flex items-center justify-center h-full p-2 hover:bg-accent/25 rounded-md"
				onClick={(event) => {
					event.stopPropagation();
					setActiveModal('EditMaterialModal', {
						id: material.id,
						link: material.link,
						subject_id: material.subject_id,
						title: material.title,
						type: material.type,
					});
				}}
			>
				<FaEllipsisVertical className="w-5 h-5" />
			</button>
		</div>
	);
}
