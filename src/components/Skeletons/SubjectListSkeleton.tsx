import LoadingSkeleton from './LoadingSkeleton';

export default function SubjectListSkeleton() {
	return (
		<div className="flex-1 my-4 relative">
			<div className="absolute inset-0 overflow-y-auto overscroll-behavior-y-contain scroll-smooth -webkit-overflow-scrolling-touch">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
					{Array.from({ length: 12 }).map((_, index) => (
						<SubjectCardSkeleton key={index} />
					))}
				</div>
			</div>
		</div>
	);
}

function SubjectCardSkeleton() {
	return (
		<div className="border border-white/10 relative rounded-lg bg-background transition-all duration-300 flex flex-col gap-3 w-full">
			{/* Subject Code Name and Description */}
			<div className="flex justify-between items-start pt-4 px-4">
				<div className="flex-1 space-y-2">
					<div className="flex items-center justify-between">
						<LoadingSkeleton width="60%" height={24} />
					</div>
					<LoadingSkeleton width="85%" height={16} />
					<LoadingSkeleton width="70%" height={16} />
				</div>
			</div>

			{/* Divider */}
			<div className="h-0.5 w-full bg-gradient-to-r from-transparent bg-secondary/30 to-transparent" />

			{/* Difficulty and Settings */}
			<div className="flex items-end justify-between gap-1 flex-1 pb-4 px-4">
				<div className="flex gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<LoadingSkeleton
							key={i}
							width="12px"
							height={12}
							className="rounded-sm"
						/>
					))}
				</div>
				<LoadingSkeleton
					width="16px"
					height={16}
					className="rounded-sm"
				/>
			</div>
		</div>
	);
}
