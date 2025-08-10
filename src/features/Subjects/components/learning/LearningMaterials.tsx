import TagLabel from '../../../../components/TagLabel';
import { FaPlus } from 'react-icons/fa';
import LearningMaterialCard from './LearningMaterialCard';
import { MaterialRead } from '../../../../services/api/schema/material_schema';
import { useSubjectStore_UI } from '../../stores/subjectStore_UI';

interface LearningMaterialsProps {
	subjectId: number;
	materials: MaterialRead[];
}

export default function SubjectMaterials({
	subjectId,
	materials,
}: LearningMaterialsProps) {
	return (
		<>
			{/* Materials */}
			{materials.map((material, index) => (
				<LearningMaterialCard
					key={index}
					subjectId={subjectId}
					material={material}
				/>
			))}
		</>
	);
}
