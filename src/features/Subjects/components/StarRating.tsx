import { GiRoundStar } from "react-icons/gi";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function StarRating({
  value,
  onChange,
  max = 5,
}: StarRatingProps) {
  return (
    <fieldset className="flex gap-1" aria-label="Star rating">
      {[...Array(max)].map((_, i) => {
        const rating = i + 1;
        return (
          <label key={rating} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={rating}
              onChange={() => onChange(rating)}
              checked={value === rating}
              className="sr-only"
            />

            {rating <= value ? (
              <GiRoundStar className="text-amber-400" />
            ) : (
              <GiRoundStar />
            )}
          </label>
        );
      })}
    </fieldset>
  );
}
