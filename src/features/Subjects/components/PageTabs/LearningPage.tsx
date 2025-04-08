import React, { useState } from "react";
import StarRating from "../StarRating";

interface LearningPageProps {}

export default function LearningPage({}: LearningPageProps) {
  const [rating, setRating] = useState(3); // default to 3 stars
  return (
    <div>
      <StarRating value={rating} onChange={setRating} />
    </div>
  );
}
