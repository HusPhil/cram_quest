import { useCallback, useEffect, useState } from "react";
import StarRating from "../StarRating";
import {
  GiCard10Clubs,
  GiNotebook,
  GiSave,
  GiVideoCamera,
} from "react-icons/gi";
import TagLabel from "../../../../components/TagLabel";
import { FaCirclePlay, FaEllipsisVertical, FaNoteSticky, FaRug } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

interface LearningPageProps {
  subjectId: number;
  subjectDifficulty: number;
}

type MaterialType = "note" | "video" | "flashcard";

const data = {
  subject_status: "I feel great about this subject",
  materials: [
    {
      type: "note",
      title: "My notes on this subject",
      link: "https://docs.google.com/document/d/1ZXf7qltzZ6gkkuXn6JhOtktEkqAt6QyJRuvGmONcqoY/edit?usp=sharing",
      created_at: "2023-10-01",
    },
    {
      type: "video",
      title: "Intro to Computer Science",
      link: "https://www.youtube.com/shorts/VPVTP-ctZ3w",
      created_at: "2023-10-02",
    },
    {
      type: "flashcard",
      title: "AP Computer Science A",
      link: "https://app.vaia.com/studyset/27223028?ref=l6pVaI1nVBQGQm2tQcTEQ9WoQA6D4Voh&ref_type=studyset_share",
      created_at: "2023-10-03",
    },
    {
      type: "note",
      title: "My notes on this subject",
      link: "https://docs.google.com/document/d/1ZXf7qltzZ6gkkuXn6JhOtktEkqAt6QyJRuvGmONcqoY/edit?usp=sharing",
      created_at: "2023-10-01",
    },
    {
      type: "video",
      title: "Programming concepts",
      link: "https://www.youtube.com/shorts/VPVTP-ctZ3w",
      created_at: "2023-10-04",
    },
    {
      type: "flashcard",
      title: "AP Computer Science A",
      link: "https://app.vaia.com/studyset/27223028?ref=l6pVaI1nVBQGQm2tQcTEQ9WoQA6D4Voh&ref_type=studyset_share",
      created_at: "2023-10-03",
    },
    {
      type: "note",
      title: "My notes on this subject",
      link: "https://docs.google.com/document/d/1ZXf7qltzZ6gkkuXn6JhOtktEkqAt6QyJRuvGmONcqoY/edit?usp=sharing",
      created_at: "2023-10-01",
    },
    {
      type: "video",
      title: "Object-oriented programming and classes of objects and inheritance and polymorphism",
      link: "https://www.youtube.com/shorts/VPVTP-ctZ3w",
      created_at: "2023-10-05",
    },
    {
      type: "flashcard",
      title: "AP Computer Science A",
      link: "https://app.vaia.com/studyset/27223028?ref=l6pVaI1nVBQGQm2tQcTEQ9WoQA6D4Voh&ref_type=studyset_share",
      created_at: "2023-10-03",
    },
    {
      type: "note",
      title: "My notes on this subject",
      link: "https://docs.google.com/document/d/1ZXf7qltzZ6gkkuXn6JhOtktEkqAt6QyJRuvGmONcqoY/edit?usp=sharing",
      created_at: "2023-10-01",
    },
    {
      type: "video",
      title: "Algorithms",
      link: "https://www.youtube.com/shorts/VPVTP-ctZ3w",
      created_at: "2023-10-06",
    },
    {
      type: "flashcard",
      title: "AP Computer Science A",
      link: "https://app.vaia.com/studyset/27223028?ref=l6pVaI1nVBQGQm2tQcTEQ9WoQA6D4Voh&ref_type=studyset_share",
      created_at: "2023-10-03",
    },
  ],
};

export default function LearningPage({
  subjectId,
  subjectDifficulty,
}: LearningPageProps) {
  const [rating, setRating] = useState(subjectDifficulty); // default to 3 stars

  useEffect(() => {
    setRating(subjectDifficulty);
  }, [subjectDifficulty]);

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
    <>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="flex items-center justify-start gap-3 py-2">
            <h1 className="text-md font-bold">Status: </h1>
            <StarRating value={rating} onChange={setRating} />
          </span>
          <span className="flex items-center justify-end gap-1 py-2">
            <GiSave className="text-2xl text-amber-400 mr-2 w-5" />
            <p className="text-xs text-text/40 mt-2">Saved ✓</p>
          </span>
        </div>
        <p className="text-xs text-text/40 mb-1">
          Write how you feel about this subject..
        </p>
        <textarea
          id="statusDescription"
          name="statusDescription"
          placeholder="Ex. No urgent activities"
          value={data.subject_status}
          className="field-size-content rounded-md
                    bg-secondary border border-accent p-2 
                    focus:border-text focus:outline-none text-sm"
        />
        <div className="mt-4">
          <div className="flex items-center justify-between mr-4 my-3">
            <span className="flex gap-2">
              <h1 className="text-md font-bold">Materials</h1>
              <TagLabel className="flex items-center rounded-full px-2">
                <p className="text-xs">{data.materials.length.toString()}</p>
              </TagLabel>
            </span>
            <span className="flex text-sm items-center bg-accent text-white p-1 rounded-md px-3">
              <button className="flex items-center gap-1">
                Add <FaPlus className="w-3 h-3" />
              </button>
            </span>
          </div>
          {data.materials.map((material, index) => (
            <div key={index} title={material.title} className="flex items-center gap-2 py-3 justify-between mr-4">
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
                  <FaEllipsisVertical className="w-4 h-4" />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
