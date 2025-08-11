import LoadingSkeleton from './LoadingSkeleton';

export default function SkinsGridSkeleton() {
	return (
		<div className="flex flex-1 flex-col">
			{/* Header */}
			<div className="mb-6 text-center">
				<LoadingSkeleton
					width="200px"
					height={32}
					className="mx-auto"
				/>
			</div>

			{/* Grid Container */}
			<div className="relative flex-1">
				<div className="absolute inset-0 overflow-y-auto scroll-smooth flex justify-center no-scrollbar">
					<div className="h-full w-full max-w-[1200px] flex flex-col py-3 px-3.5 md:py-5 md:px-7">
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7">
							{Array.from({ length: 10 }).map((_, index) => (
								<SkinsGridItemSkeleton key={index} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function SkinsGridItemSkeleton() {
	return (
		<div className="group relative flex flex-col bg-background border rounded-lg overflow-hidden transition-all duration-300 ease-in-out shadow-lg border-white/20">
			{/* Image container */}
			<div className="flex-1 flex justify-center p-2">
				<LoadingSkeleton
					width="120px"
					height="120px"
					className="rounded-full aspect-square"
				/>
			</div>

			{/* Content section */}
			<div className="flex flex-col flex-grow pb-5 px-3 space-y-2">
				{/* Name */}
				<div className="text-center" style={{ minHeight: '2.5rem' }}>
					<LoadingSkeleton
						width="80%"
						height={16}
						className="mx-auto mb-1"
					/>
					<LoadingSkeleton
						width="60%"
						height={16}
						className="mx-auto"
					/>
				</div>

				{/* Button */}
				<LoadingSkeleton height={32} className="w-full rounded" />
			</div>
		</div>
	);
}
