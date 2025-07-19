import { TbBolt, TbFlame } from 'react-icons/tb';
import colors from '../../../../data/colors';

export default function BattleResultStats({
	result,
	bonus_xp,
	base_xp,
	streak_count,
}: {
	result: 'victory' | 'defeat' | null;
	bonus_xp: number;
	base_xp: number;
	streak_count: number;
}) {
	const textColor = result === 'victory' ? 'text-success' : 'text-danger';
	const iconColor = result === 'victory' ? colors.success : colors.danger;

	return (
		<div className="w-full flex justify-between gap-3 mt-3">
			<div className="flex flex-col flex-1  justify-center items-center p-2 bg-secondary border-success rounded-md">
				<div className="flex justify-center items-center gap-1">
					<TbBolt color={iconColor} />
					<p className={`text-sm ${textColor}`}>Total XP</p>
				</div>
				<p className="">{base_xp + bonus_xp}</p>
			</div>
			<div className="flex flex-col flex-1  justify-center items-center p-2 gap-1 bg-secondary border-success rounded-md">
				<div className="flex justify-center items-center gap-1">
					<TbFlame color={iconColor} />
					<p className={`text-sm ${textColor}`}>Streak</p>
				</div>
				{result === 'victory' ? (
					<p className="text-success">{streak_count} wins</p>
				) : (
					<p className="text-sm text-danger">RESET</p>
				)}
			</div>
		</div>
	);
}
