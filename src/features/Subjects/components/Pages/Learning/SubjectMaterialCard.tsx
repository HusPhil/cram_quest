import { useCallback } from "react";
import TagLabel from "../../../../../components/TagLabel";
import {
  FaCirclePlay,
  FaEllipsisVertical,
  FaNoteSticky,
  FaRug,
} from "react-icons/fa6";
import { MaterialType } from "./LearningPage";
import { MaterialRead } from "../../../../../services/api/schema/material_schema";

interface SubjectMaterialCardProps {
  material: MaterialRead;
  subjectId: number;
  handleShowEditModal: (materialId: number) => void;
}

export default function SubjectMaterialCard({
  material,
  subjectId,
  handleShowEditModal,
}: SubjectMaterialCardProps) {
  const getIconFromMaterialType = useCallback((type: MaterialType) => {
    switch (type) {
      case "Note":
        return <FaNoteSticky className="w-4 h-4" />;
      case "Video":
        return <FaCirclePlay className="w-4 h-4" />;
      case "Flashcard":
        return <FaRug className="w-4 h-4" />;
      default:
        return null;
    }
  }, []);

  return (
    <div
      title={material.title}
      className="flex items-center gap-2 py-3 justify-between mr-4"
    >
      <div className="flex items-center gap-2">
        <TagLabel className="rounded-full p-2 border shrink-0">
          {getIconFromMaterialType(material.type as MaterialType)}
        </TagLabel>
        <div className="flex flex-col justify-center">
          <a href={material.link} className="hover:text-accent">
            <p className="line-clamp-1 text-sm">{material.title}</p>
          </a>
          <small className="text-text/40 text-xs">{`${material.type} • <TBI>`}</small>
        </div>
      </div>
      <span className="flex items-center justify-center h-full">
        <button>
          <FaEllipsisVertical
            className="w-4 h-4"
            onClick={() => handleShowEditModal(material.id)}
          ></FaEllipsisVertical>
        </button>
      </span>
    </div>
  );
}
