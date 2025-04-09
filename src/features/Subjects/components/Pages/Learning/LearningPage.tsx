import { useEffect, useState } from "react";
import SubjectStatus from "./SubjectStatus";
import SubjectMaterials from "./SubjectMaterials";

interface LearningPageProps {
  subjectId: number;
  subjectDifficulty: number;
}

export type SubjectMaterial = {
  type: MaterialType;
  title: string;
  link: string;
  created_at: string;
};

export type MaterialType = "note" | "video" | "flashcard";

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
      title:
        "Object-oriented programming and classes of objects and inheritance and polymorphism",
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

  return (
    <>
      <div className="flex flex-1 flex-col">
        <SubjectStatus
          rating={rating}
          setRating={setRating}
          subject_status={data.subject_status}
        />

        <div className="mt-4">
          <SubjectMaterials materials={data.materials as SubjectMaterial[]} />
        </div>

      </div>
    </>
  );
}
