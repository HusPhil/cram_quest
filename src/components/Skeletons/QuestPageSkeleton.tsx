import LoadingSkeleton from './LoadingSkeleton';

export default function QuestsPageSkeleton() {
	return (
		<div className="flex flex-1 h-full max-h-full flex-col">
			{/* Header Skeleton */}
			<QuestListHeaderSkeleton />

			{/* Quest List Skeleton */}
			<div className="overflow-auto h-full no-scrollbar flex-1">
				<QuestListSkeleton />
			</div>
		</div>
	);
}

function QuestListHeaderSkeleton() {
	return (
		<div className="flex items-center justify-between py-5">
			{/* Filter toggles */}
			<div className="flex gap-2">
				<LoadingSkeleton
					width="60px"
					height={32}
					className="rounded-md"
				/>
				<LoadingSkeleton
					width="50px"
					height={32}
					className="rounded-md"
				/>
				<LoadingSkeleton
					width="70px"
					height={32}
					className="rounded-md"
				/>
			</div>

			{/* Add button */}
			<LoadingSkeleton width="80px" height={32} className="rounded-md" />
		</div>
	);
}

function QuestListSkeleton() {
	return (
		<div className="space-y-5 mt-3 px-2">
			{Array.from({ length: 8 }).map((_, index) => (
				<QuestCardSkeleton key={index} />
			))}
		</div>
	);
}

function QuestCardSkeleton() {
	return (
		<div className="bg-background border-white/10 border rounded-lg py-2 px-3 fade-in-on-view transition-all duration-300">
			<div className="flex justify-between items-start">
				<div className="w-full">
					<div className="flex gap-2 justify-between w-full mb-2">
						<div className="flex gap-2 items-center">
							{/* Status badge */}
							<LoadingSkeleton
								width="50px"
								height={24}
								className="rounded-md"
							/>

							{/* Star rating */}
							<div className="flex gap-3">
								{Array.from({ length: 5 }).map((_, i) => (
									<LoadingSkeleton
										key={i}
										width="14px"
										height={14}
										className="rounded-sm"
									/>
								))}
							</div>
						</div>

						{/* Time ago */}
						<LoadingSkeleton
							width="60px"
							height={16}
							className="rounded-sm"
						/>
					</div>

					{/* Description */}
					<div className="m-2 space-y-1">
						<LoadingSkeleton width="95%" height={16} />
					</div>
				</div>
			</div>
		</div>
	);
}
