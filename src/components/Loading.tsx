import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
	return (
		<div
			role="status"
			aria-live="polite"
			className="h-[100dvh] bg-background text-white flex items-center justify-center p-4 overflow-hidden"
		>
			<div className="relative w-full max-w-xs border-2 border-accent/40 bg-secondary/30 px-8 py-10 flex flex-col items-center gap-6">
				{/* Pixel corner accents */}
				<span className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 bg-accent" aria-hidden="true" />
				<span className="absolute -top-[5px] -right-[5px] w-2.5 h-2.5 bg-accent" aria-hidden="true" />
				<span className="absolute -bottom-[5px] -left-[5px] w-2.5 h-2.5 bg-accent" aria-hidden="true" />
				<span className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 bg-accent" aria-hidden="true" />

				<img
					src="/cramquest.ico"
					alt=""
					aria-hidden="true"
					className="w-12 h-12 animate-bounce motion-reduce:animate-none [image-rendering:pixelated]"
				/>

				<h1 className="font-rpg text-2xl sm:text-3xl text-accent tracking-wider [text-shadow:0_0_12px_rgba(219,154,64,0.6)]">
					CRAM<span className="text-white [text-shadow:none]">QUEST</span>
				</h1>

				<p className="text-text/70 font-rpg text-xs uppercase tracking-widest animate-pulse motion-reduce:animate-none">
					Preparing your adventure…
				</p>

				{/* Indeterminate pixel progress bar */}
				<div className="relative w-full h-3 bg-secondary border border-accent/40 overflow-hidden">
					<div className="animate-topbar-progress absolute top-0 left-0 h-full w-1/3 bg-accent shadow-[0_0_8px_rgba(219,154,64,0.9)] motion-reduce:animate-none" />
				</div>
			</div>
		</div>
	);
}
