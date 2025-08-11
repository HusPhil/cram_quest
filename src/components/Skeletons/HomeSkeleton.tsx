import LoadingSkeleton from './LoadingSkeleton';

// components/Loading.tsx
export default function HomeSkeleton() {
	return (
		<div className="min-h-[100dvh] flex flex-col items-center justify-center bg-background w-full px-5">
			<h1 className="text-xl font-bold mb-3">Hang on a little… </h1>
			<div className="p-6 rounded-lg border border-secondary shadow-lg bg-background space-y-4 w-full max-w-lg px-2">
				<LoadingSkeleton
					className="my-1 mx-2"
					height={28}
					width="60%"
				/>
				<LoadingSkeleton
					className="my-1 mx-2"
					height={20}
					width="80%"
				/>
				<LoadingSkeleton
					className="my-1 mx-2"
					height={20}
					width="90%"
				/>
				<LoadingSkeleton
					className="my-1 mx-2"
					height={20}
					width="70%"
				/>
			</div>
		</div>
	);
}
