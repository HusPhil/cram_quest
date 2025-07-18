export default function BattleResultXPGained({
	baseXp,
	bonusXp,
}: {
	baseXp: number;
	bonusXp: number;
}) {
	return (
		<div className="w-full flex flex-col justify-center items-center space-y-1">
			<p className="text-sm">EXPERIENCE GAINED</p>
			<div className="space-y-3 flex flex-col justify-center items-center">
				<div className="flex items-center gap-3">
					<p className="text-4xl font-bold text-success">+{baseXp}</p>
					<p className="text-2xl text-accent animate-pulse">
						+{bonusXp}
					</p>
					{/* <div className="flex flex-col items-center">
						<p className="text-xs text-white opacity-50">
							BONUS XP
						</p>
					</div> */}
				</div>
			</div>
			{/* <p className="text-sm text-accent mt-5">
				TOTAL XP: {baseXp + bonusXp}
			</p> */}
		</div>
	);
}
