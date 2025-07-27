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

	return <></>;
}
