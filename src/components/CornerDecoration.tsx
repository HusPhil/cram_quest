import { memo } from 'react';

export const CornerDecoration = () => {
	return (
		<>
			<div className="absolute top-0 left-0 w-16 h-16">
				<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/80 to-transparent" />
				<div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-accent/80 to-transparent" />
			</div>
			<div className="absolute top-0 right-0 w-16 h-16">
				<div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent/80 to-transparent" />
				<div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-accent/80 to-transparent" />
			</div>
			<div className="absolute bottom-0 left-0 w-16 h-16">
				<div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/80 to-transparent" />
				<div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-accent/80 to-transparent" />
			</div>
			<div className="absolute bottom-0 right-0 w-16 h-16">
				<div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent/80 to-transparent" />
				<div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-accent/80 to-transparent" />
			</div>
		</>
	);
};

export default memo(CornerDecoration);
