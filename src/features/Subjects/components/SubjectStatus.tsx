import { useEffect, useRef } from 'react';
import StarRating from './ui/StarRating';
import { FaFloppyDisk } from 'react-icons/fa6';

interface LearningStatusUpdateProps {
	subjectId: number;
	rating: number;
	setRating: (rating: number) => void;
	subjectStatus: string;
}

export default function LearningStatus({
	subjectId,
	rating,
	setRating,
	subjectStatus,
}: LearningStatusUpdateProps) {
	const statusRef = useRef<HTMLTextAreaElement>(null);

	const handleSave = () => {
		const updatedStatus = statusRef.current?.value || '';
		alert('Saving:' + updatedStatus);
		// Handle save logic here (e.g. API call or state update)
	};

	useEffect(() => {
		if (statusRef.current) {
			statusRef.current.value = subjectStatus;
		}
	}, [subjectId]);

	return (
		<>
			{/* Header */}
			<div className="flex items-center justify-between">
				<span className="flex items-center justify-start gap-3 py-2">
					<h1 className="text-md font-bold">Priority: </h1>
					<StarRating
						value={rating}
						onChange={setRating}
						displayOnly={false}
					/>
				</span>
				{/* <span className="flex text-sm items-center bg-accent text-white p-1 rounded-md px-3">
					<button
						onClick={handleSave}
						className="flex items-center gap-1"
					>
						Save <FaFloppyDisk className="w-3 h-3" />
					</button>
				</span> */}
			</div>

			{/* Description
			<p className="text-xs text-text/40 my-2">
				Write how you feel about this subject..
			</p>

			<textarea
				id="statusDescription"
				name="statusDescription"
				placeholder="Ex. No urgent activities"
				defaultValue={subjectStatus}
				ref={statusRef}
				className="field-size-content rounded-md
                  bg-secondary border border-accent p-2 
                  focus:border-text focus:outline-none text-sm"
			/> */}
		</>
	);
}
