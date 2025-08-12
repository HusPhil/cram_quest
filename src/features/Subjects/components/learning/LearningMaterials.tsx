import LearningMaterialCard from './LearningMaterialCard';
import { MaterialRead } from '../../../../services/api/schema/material_schema';

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
