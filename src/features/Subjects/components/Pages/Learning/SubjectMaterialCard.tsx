import { useCallback } from "react";
import TagLabel from "../../../../../components/TagLabel";
import { FaCirclePlay, FaEllipsis, FaNoteSticky, FaRug } from "react-icons/fa6";
import { MaterialType, SubjectMaterial } from "./LearningPage";

interface SubjectMaterialCardProps {
  material: SubjectMaterial;
}

export default function SubjectMaterialCard({
  material,
}: SubjectMaterialCardProps) {
  const getIconFromMaterialType = useCallback((type: MaterialType) => {
    switch (type) {
      case "note":
        return <FaNoteSticky className="w-4 h-4" />;
      case "video":
        return <FaCirclePlay className="w-4 h-4" />;
      case "flashcard":
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
          <small className="text-text/40 text-xs">{`${material.type} • ${material.created_at}`}</small>
        </div>
      </div>
      <span className="flex items-center justify-center h-full">
        <button>
          <FaEllipsis className="w-4 h-4" />
        </button>
      </span>
    </div>
  );
}
