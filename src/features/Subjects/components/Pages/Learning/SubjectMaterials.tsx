import TagLabel from "../../../../../components/TagLabel";
import { FaPlus } from "react-icons/fa";
import { SubjectMaterial } from "./LearningPage";
import SubjectMaterialCard from "./SubjectMaterialCard";
import { useState } from "react";
import AddNewMaterialModal from "../../Modals/AddNewMaterialModal";

interface SubjectMaterialsProps {
  subjectId: number;
  materials: SubjectMaterial[];
}

export default function SubjectMaterials({
  subjectId,
  materials,
}: SubjectMaterialsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleShowAddNewMaterialModal() {
    setIsModalOpen(true);
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between my-3">
        <span className="flex gap-2">
          <h1 className="text-md font-bold">Materials</h1>
          <TagLabel className="flex items-center rounded-full px-2">
            <p className="text-xs">{materials.length.toString()}</p>
          </TagLabel>
        </span>
        <span className="flex text-sm items-center bg-accent text-white p-1 rounded-md px-3">
          <button
            className="flex items-center gap-1"
            onClick={handleShowAddNewMaterialModal}
          >
            Add <FaPlus className="w-3 h-3" />
          </button>
        </span>
      </div>

      {/* Materials */}
      {materials.map((material, index) => (
        <SubjectMaterialCard key={index} material={material} />
      ))}

      <AddNewMaterialModal
        subjectId={subjectId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
