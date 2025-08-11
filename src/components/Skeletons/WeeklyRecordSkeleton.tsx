import LoadingSkeleton from './LoadingSkeleton';

export default function WeeklyRecordSkeleton() {
	return (
		<div>
			{/* Header Section */}
			<div className="flex items-end justify-between">
				<div>
					<LoadingSkeleton width={140} height={20} className="my-3" />
				</div>
				<div className="my-3">
					<LoadingSkeleton width={80} height={20} />
				</div>
			</div>

			{/* Days Section */}
			<div className="grid grid-cols-7 gap-0 border border-secondary rounded-lg overflow-hidden md:gap-4 md:mx-0 md:rounded-none md:overflow-visible md:border-none">
				{Array(7)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className="relative  border-secondary p-3 md:p-4 md:border md:rounded-lg flex flex-col items-center justify-center space-y-2 md:space-y-1 lg:space-y-[0.5] lg:space-x-2 lg:flex-row"
						>
							<LoadingSkeleton width={24} height={12} />
							<LoadingSkeleton circle width={8} height={8} />
						</div>
					))}
			</div>

			{/* Mobile description */}
			<LoadingSkeleton
				width={200}
				height={12}
				className="my-4 lg:hidden"
			/>
		</div>
	);
}
