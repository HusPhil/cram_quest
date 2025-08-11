import LoadingSkeleton from './LoadingSkeleton';

export default function PlayerCardSkeleton() {
	return (
		<div className="flex flex-col items-center p-4">
			<LoadingSkeleton circle width={96} height={96} className="mb-4" />{' '}
			{/* Avatar */}
			<LoadingSkeleton width={120} height={20} className="mb-2" />{' '}
			{/* Name */}
			<LoadingSkeleton width={80} height={16} className="mb-2" />{' '}
			{/* Title */}
			<LoadingSkeleton width="100%" height={10} /> {/* XP bar */}
		</div>
	);
}
