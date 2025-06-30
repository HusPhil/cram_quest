export default function NavFooter() {
	return (
		<div className="w-full p-4">
			<div className="mx-3 mb-3 p-4 rounded-lg bg-gradient-to-r from-amber-400/10 to-transparent">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
					<span className="text-sm font-medium text-amber-400/80 line-clamp-1">
						Ready for battle
					</span>
				</div>
			</div>
		</div>
	);
}
