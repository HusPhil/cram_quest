export default function BattleResultXPGained({
	baseXp,
	bonusXp,
	result,
}: {
	baseXp: number;
	bonusXp: number;
	result: 'victory' | 'defeat' | null;
}) {
	const textColor = result === 'victory' ? 'text-success' : 'text-danger';

	return (
		<div className="w-full flex flex-col justify-center items-center space-y-1 bg-secondary p-3 rounded-md">
			<p className="text-sm">EXPERIENCE GAINED</p>
			<div className="space-y-3 flex flex-col justify-center items-center">
				<div className="flex items-center gap-3">
					<p className={`text-4xl font-bold ${textColor}`}>
						+{baseXp}
					</p>
					<p className="text-2xl text-accent animate-pulse">
						+{bonusXp}
					</p>
				</div>
			</div>
		</div>
	);
}
