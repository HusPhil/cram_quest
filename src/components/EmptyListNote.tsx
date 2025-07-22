import React from 'react';

interface EmptyListNoteProps {
	message: string;
	hint?: string;
	className?: string;
}

const EmptyListNote: React.FC<EmptyListNoteProps> = ({
	message,
	hint,
	className,
}) => (
	<div
		className={`text-center text-base flex items-center justify-center italic ${className}`}
	>
		<span>
			{message}
			<br /> {hint}
		</span>
	</div>
);

export default EmptyListNote;
