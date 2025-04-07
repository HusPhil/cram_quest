import React, { useState } from "react";
import StarRating from "../StarRating";

interface LearningPageProps {}

export default function LearningPage({}: LearningPageProps) {
  const [rating, setRating] = useState(3); // default to 3 stars
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Learning</h1>
      <p className="mb-4">This is the learning page</p>
      <StarRating value={rating} onChange={setRating} />
    </div>
  );
}
