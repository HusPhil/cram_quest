import { useState } from "react";
import StarRating from "../StarRating";
import { GiSave } from "react-icons/gi";

interface LearningPageProps {}

export default function LearningPage({}: LearningPageProps) {
  const [rating, setRating] = useState(3); // default to 3 stars
  return (
    <div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <span className="flex items-center justify-start gap-3 py-2">
              <p>Status: </p>
              <StarRating value={rating} onChange={setRating} />
            </span>
            <span className="flex items-center justify-end gap-1 py-2">
              <GiSave className="text-2xl text-amber-400 mr-2 w-5"/>
              <p className="text-xs text-text/40 mt-2">Saved ✓</p>
            </span>
          </div>
          <p className="text-xs text-text/40 mb-1">Write how you feel about this subject..</p>
          <textarea placeholder="Ex. No urgent activities" className="field-size-content rounded-md bg-secondary border border-accent p-2 text-sm" rows={3} name="statusDescription" id="statusDescription"></textarea>
        </div>
    </div>
  );
}
